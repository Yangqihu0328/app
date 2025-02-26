/**************************************************************************************************
 *
 * Copyright (c) 2019-2023 Axera Semiconductor (Shanghai) Co., Ltd. All Rights Reserved.
 *
 * This source file is the property of Axera Semiconductor (Shanghai) Co., Ltd. and
 * may not be copied or distributed in any isomorphic form without the prior
 * written consent of Axera Semiconductor (Shanghai) Co., Ltd.
 *
 **************************************************************************************************/

#include "Detector.hpp"
#include <string.h>
#include <chrono>
#include <unordered_set>
#include <exception>
#include "AXException.hpp"
#include "AppLogApi.h"
#include "BoxConfig.hpp"
#include "DetectResult.hpp"
#include "BoxMediaParser.hpp"
#include "BoxModelParser.hpp"
#include "ElapsedTimer.hpp"
#include "ax_ivps_api.h"
#if defined(__RECORD_VB_TIMESTAMP__)
#include "TimestampHelper.hpp"
#endif

using namespace std;
#define DETECTOR "SKEL"

#define ALIGN_UP(x, align) (((x) + ((align)-1)) & ~((align)-1))

AX_VOID CDetector::WorkerThread(AX_U32 nGrd) {
    CAXFrame axFrame;
    ax_image_t ax_image{0};

    while (!stop_) {

        if (m_arrFrameQ[nGrd].Pop(axFrame, -1)) {
            LOG_M_D(DETECTOR, "runskel vdGrp %d vdChn %d frame %lld pts %lld phy 0x%llx %dx%d stride %d blkId 0x%x", axFrame.nGrp,
                    axFrame.nChn, axFrame.stFrame.stVFrame.stVFrame.u64SeqNum, axFrame.stFrame.stVFrame.stVFrame.u64PTS,
                    axFrame.stFrame.stVFrame.stVFrame.u64PhyAddr[0], axFrame.stFrame.stVFrame.stVFrame.u32Width,
                    axFrame.stFrame.stVFrame.stVFrame.u32Height, axFrame.stFrame.stVFrame.stVFrame.u32PicStride[0],
                    axFrame.stFrame.stVFrame.stVFrame.u32BlkId[0]);

            auto &frame_info = axFrame.stFrame.stVFrame.stVFrame;
            if (ax_image.pVir == nullptr) {
                ax_image.nSize = frame_info.u32FrameSize;
                ax_image.nWidth = frame_info.u32Width;
                ax_image.nHeight = frame_info.u32Height;
                ax_image.eDtype = ax_color_space_nv12;
                ax_image.tStride_W = frame_info.u32PicStride[0];
                AX_U32 nImgSize = ALIGN_UP(ax_image.nSize, 65536);
                AX_SYS_MemAlloc(&ax_image.pPhy, &ax_image.pVir, nImgSize, 0x100, (const AX_S8 *)"ax_algo");

                int ret = AX_IVPS_CmmCopyTdp(frame_info.u64PhyAddr[0], ax_image.pPhy, nImgSize);
                if (ret != 0) {
                    LOG_M_E(DETECTOR, "AX_IVPS_CmmCopyTdp fail=0x%x\n", ret);
                    continue;
                }
            } else if (frame_info.u32FrameSize != ax_image.nSize) {
                ax_release_image(&ax_image);

                ax_image.nSize = frame_info.u32FrameSize;
                ax_image.nWidth = frame_info.u32Width;
                ax_image.nHeight = frame_info.u32Height;
                ax_image.eDtype = ax_color_space_nv12;
                ax_image.tStride_W = frame_info.u32PicStride[0];
                AX_U32 nImgSize = ALIGN_UP(ax_image.nSize, 65536);
                AX_SYS_MemAlloc(&ax_image.pPhy, &ax_image.pVir, nImgSize, 0x100, (const AX_S8 *)"ax_algo");

                int ret = AX_IVPS_CmmCopyTdp(frame_info.u64PhyAddr[0], ax_image.pPhy, nImgSize);
                if (ret != 0) {
                    LOG_M_E(DETECTOR, "AX_IVPS_CmmCopyTdp fail=0x%x\n", ret);
                    continue;
                }
            }

            for (int index = 0; index < ALGO_MAX_NUM; index++) {
                if (handle_[nGrd][index] != NULL) {
#ifdef __BOX_DEBUG__
                    ofstream ofs;
                    AX_CHAR szFile[64];
                    sprintf(szFile, "./ai_dump_%d_%lld.yuv", frame_info.u32FrameSize, frame_info.u64SeqNum);
                    ofs.open(szFile, ofstream::out | ofstream::binary | ofstream::trunc);
                    if (0 == frame_info.u64VirAddr[0]) {
                        frame_info.u64VirAddr[0] = (AX_U64)AX_POOL_GetBlockVirAddr(frame_info.u32BlkId[0]);
                    }
                    ofs.write((const char *)frame_info.u64VirAddr[0], frame_info.u32FrameSize);
                    ofs.close();
#endif

                    // AX_U64 nStartMs = CElapsedTimer::GetInstance()->GetTickCount();

                    ax_result_t forward_result;
                    ax_algorithm_track(handle_[nGrd][index], &ax_image, &forward_result);

                    // AX_U64 nEndMs = CElapsedTimer::GetInstance()->GetTickCount();
                    // LOG_M_E(DETECTOR, "ax_algorithm_track model id=%u, took time=%ldms +++", index, nEndMs - nStartMs);

                    DETECT_RESULT_T result;
                    result.nW = frame_info.u32Width;
                    result.nH = frame_info.u32Height;
                    result.nSeqNum = frame_info.u64SeqNum;
                    result.nGrpId = axFrame.nGrp;
                    result.nAlgoType = ax_algorithm_get_model_type(handle_[nGrd][index]);
                    result.nCount = forward_result.n_objects;

                    for (AX_U32 i = 0; i < result.nCount; ++i) {
                        const auto &obj = forward_result.objects[i];
                        auto &item = result.item[i];
                        auto &tBox = item.tBox;

                        item.eType = static_cast<DETECT_TYPE_E>(result.nAlgoType);
                        item.fScore = obj.score;
                        item.nTrackId = obj.track_id;

                        memcpy(&item.data.face_info, &obj.face_info, sizeof(item.data.face_info));
                        memcpy(&item.data.person_info, &obj.person_info, sizeof(item.data.person_info));
                        memcpy(&item.data.fire_smoke_info, &obj.fire_smoke_info, sizeof(item.data.fire_smoke_info));
                        memcpy(&item.data.vehicle_info, &obj.vehicle_info, sizeof(item.data.vehicle_info));

                        // LOG_M_E(DETECTOR, "model id=%u, draw box [%.2f, %.2f, %.2f, %.2f], label=%d", result.nAlgoType,
                        //     obj.bbox.x, obj.bbox.y, obj.bbox.w, obj.bbox.h, obj.fire_smoke_info.label);

                        // 提取边界框并校验宽度和高度
                        float x = obj.bbox.x;
                        float y = obj.bbox.y;

                        float w = obj.bbox.w;
                        float h = obj.bbox.h;

                        if (x + w + 1 > frame_info.u32Width) {
                            w = frame_info.u32Width - x - 1;
                        }

                        if (y + h + 1 > frame_info.u32Height) {
                            h = frame_info.u32Height - y - 1;
                        }

                        tBox.fX = x;
                        tBox.fY = y;
                        tBox.fW = std::max(0.0f, w);
                        tBox.fH = std::max(0.0f, h);  // 确保宽高不会为负
                    }

                    if (result.nCount > 0) {
                        CDetectResult::GetInstance()->Set(axFrame.nGrp, result);
                    }
                }
            }

            ax_release_image(&ax_image);
            /* release frame after done */
            axFrame.DecRef();
        }
    }
}

AX_BOOL CDetector::Init(const DETECTOR_ATTR_T &stAttr) {
    LOG_M_D(DETECTOR, "%s: +++", __func__);

    if (0 == stAttr.nChannelNum) {
        LOG_M_E(DETECTOR, "%s: 0 nChannelNum", __func__);
        return AX_FALSE;
    }

    m_stAttr = stAttr;

    if (m_stAttr.nSkipRate <= 0) {
        m_stAttr.nSkipRate = 1;
    }

    // 解码后的帧队列
    m_arrFrameQ = new (nothrow) CAXLockQ<CAXFrame>[stAttr.nChannelNum];
    if (!m_arrFrameQ) {
        LOG_M_E(DETECTOR, "%s: alloc queue fail", __func__);
        return AX_FALSE;
    } else {
        for (AX_U32 i = 0; i < stAttr.nChannelNum; ++i) {
            m_arrFrameQ[i].SetCapacity(1);
        }
    }

    // 获取当前通道信息
    AX_U32 nMediaCnt = 0;
    AX_U32 nModelCnt = 0;
    STREAM_CONFIG_T streamConfig = CBoxConfig::GetInstance()->GetStreamConfig();
    std::vector<MEDIA_INFO_T> mediasMap = CBoxMediaParser::GetInstance()->GetMediasMap(&nMediaCnt, streamConfig.strMediaPath);
    std::vector<MODEL_INFO_T> modelsMap = CBoxModelParser::GetInstance()->GetModelsMap(&nModelCnt, streamConfig.strModelPath);
    for (AX_U32 nChn = 0; nChn < stAttr.nChannelNum; ++nChn) {
        if (mediasMap[nChn].nMediaDelete == 1) {
            continue;
        }

        for (size_t i = 0; i < ALGO_MAX_NUM && i < mediasMap[nChn].taskInfo.vAlgo.size(); ++i) {
            if (mediasMap[nChn].taskInfo.nTaskDelete == 1 || mediasMap[nChn].taskInfo.nTaskStatus == 0) {
                continue;
            }

            AX_U32 algo = mediasMap[nChn].taskInfo.vAlgo[i];
            if (algo >= modelsMap.size() || algo != modelsMap[algo].nModelId) {
                LOG_M_E(DETECTOR, "models josn file config error!!!");
                continue;
            }

            AX_U64 nStartMs = CElapsedTimer::GetInstance()->GetTickCount();
            LOG_M_E(DETECTOR, "model id=%u, model file=%s +++", modelsMap[algo].nModelId, modelsMap[algo].szModelPath);

            ax_algorithm_init_t init_info;
            init_info.model_type = static_cast<ax_model_type_e>(modelsMap[algo].nModelId);
            strcpy(init_info.model_file, modelsMap[algo].szModelPath);
            std::string cur_dir = GetCurrentDir();
            strcpy(init_info.license_path, cur_dir.c_str());
            init_info.param = ax_algorithm_get_default_param();
            LOG_M_E(DETECTOR, "model id=%u, fire smoke param=%.2f +++", modelsMap[algo].nModelId, init_info.param.fire_smoke_param.det_threshold);
            int ret = ax_algorithm_init(&init_info, &handle_[nChn][i]);
            if (ret != 0) {
                LOG_M_E(DETECTOR, "%s: ax_algorithm_init fail=0x%x", __func__, ret);
                return AX_FALSE;
            }

            AX_U64 nEndMs = CElapsedTimer::GetInstance()->GetTickCount();
            LOG_M_E(DETECTOR, "model id=%u, model file=%s, took time=%ldms +++", modelsMap[algo].nModelId, modelsMap[algo].szModelPath,
                    nEndMs - nStartMs);
        }
    }

    LOG_M_D(DETECTOR, "%s: ---", __func__);
    return AX_TRUE;
}

AX_BOOL CDetector::DeInit(AX_VOID) {
    LOG_M_D(DETECTOR, "%s: +++", __func__);

    // 获取当前通道信息
    AX_U32 nMediaCnt = 0;
    STREAM_CONFIG_T streamConfig = CBoxConfig::GetInstance()->GetStreamConfig();
    std::vector<MEDIA_INFO_T> mediasMap = CBoxMediaParser::GetInstance()->GetMediasMap(&nMediaCnt, streamConfig.strMediaPath);
    for (AX_U32 nChn = 0; nChn < m_stAttr.nChannelNum; ++nChn) {
        if (mediasMap[nChn].nMediaDelete == 1) {
            continue;
        }

        for (size_t i = 0; i < ALGO_MAX_NUM && i < mediasMap[nChn].taskInfo.vAlgo.size(); ++i) {
            if (mediasMap[nChn].taskInfo.nTaskDelete == 1) {
                continue;
            }

            if (handle_[nChn][i] != nullptr) {
                ax_algorithm_deinit(handle_[nChn][i]);
            }
        }
    }

    if (m_arrFrameQ) {
        delete[] m_arrFrameQ;
        m_arrFrameQ = nullptr;
    }

    LOG_M_D(DETECTOR, "%s: ---", __func__);
    return AX_TRUE;
}

AX_BOOL CDetector::Start(AX_VOID) {
    LOG_M_D(DETECTOR, "%s: +++", __func__);

    stop_ = AX_FALSE;
    for (AX_U32 i = 0; i < m_stAttr.nChannelNum; ++i) {
        detect_threads_.emplace_back([this, i]() { this->WorkerThread(i); });
    }
    for (auto& th : detect_threads_) {
        th.detach();
    }

    LOG_M_D(DETECTOR, "%s: ---", __func__);
    return AX_TRUE;
}

//指定id开始，实际上就是对m_arrFrameQ进行初始化和调用npu接口
AX_BOOL CDetector::StartId(int id) {
    LOG_M_W(DETECTOR, "%s: +++", __func__);
    do {
        AX_U32 nMediaCnt = 0;
        AX_U32 nModelCnt = 0;
        STREAM_CONFIG_T streamConfig = CBoxConfig::GetInstance()->GetStreamConfig();
        std::vector<MEDIA_INFO_T> mediasMap = CBoxMediaParser::GetInstance()->GetMediasMap(&nMediaCnt, streamConfig.strMediaPath);
        std::vector<MODEL_INFO_T> modelsMap = CBoxModelParser::GetInstance()->GetModelsMap(&nModelCnt, streamConfig.strModelPath);

        for (size_t i = 0; i < ALGO_MAX_NUM && i < mediasMap[id].taskInfo.vAlgo.size(); ++i) {
            if (mediasMap[id].taskInfo.nTaskDelete == 1 || mediasMap[id].taskInfo.nTaskStatus == 0) {
                continue;
            }

            AX_U32 algo = mediasMap[id].taskInfo.vAlgo[i];
            if (algo >= modelsMap.size() || algo != modelsMap[algo].nModelId) {
                LOG_M_E(DETECTOR, "models josn file config error!!!");
                continue;
            }

            AX_U64 nStartMs = CElapsedTimer::GetInstance()->GetTickCount();
            LOG_M_E(DETECTOR, "model id=%u, model file=%s +++", modelsMap[algo].nModelId, modelsMap[algo].szModelPath);

            ax_algorithm_init_t init_info;
            init_info.model_type = static_cast<ax_model_type_e>(modelsMap[algo].nModelId);
            strcpy(init_info.model_file, modelsMap[algo].szModelPath);
            std::string cur_dir = GetCurrentDir();
            strcpy(init_info.license_path, cur_dir.c_str());
            init_info.param = ax_algorithm_get_default_param();
            LOG_M_E(DETECTOR, "model id=%u, fire smoke param=%.2f +++", modelsMap[algo].nModelId, init_info.param.fire_smoke_param.det_threshold);
            int ret = ax_algorithm_init(&init_info, &handle_[id][i]);
            if (ret != 0) {
                LOG_M_E(DETECTOR, "%s: ax_algorithm_init fail=0x%x", __func__, ret);
                return AX_FALSE;
            }

            AX_U64 nEndMs = CElapsedTimer::GetInstance()->GetTickCount();
            LOG_M_E(DETECTOR, "model id=%u, model file=%s, took time=%ldms +++", modelsMap[algo].nModelId, modelsMap[algo].szModelPath,
                    nEndMs - nStartMs);

            // ax_algorithm_save_debug_image(handle_[id][i], false);
        }
    } while (0);

    LOG_M_D(DETECTOR, "%s: ---", __func__);
    return AX_TRUE;
}

AX_BOOL CDetector::Stop(AX_VOID) {
    LOG_M_D(DETECTOR, "%s: +++", __func__);

    stop_ = AX_TRUE;

    if (m_arrFrameQ) {
        for (AX_U32 i = 0; i < m_stAttr.nChannelNum; ++i) {
            m_arrFrameQ[i].Wakeup();
        }
    }

    if (m_arrFrameQ) {
        for (AX_U32 i = 0; i < m_stAttr.nChannelNum; ++i) {
            ClearQueue(i);
        }
    }

    LOG_M_D(DETECTOR, "%s: ---", __func__);
    return AX_TRUE;
}

//指定id停止，但是不会停止detector主线程。
AX_BOOL CDetector::StopId(int id) {
    LOG_M_D(DETECTOR, "%s: +++", __func__);

    //先把消息队列清空，再删除skel
    if (m_arrFrameQ) {
        m_arrFrameQ[id].Wakeup();
        ClearQueue(id);
    }

    if (handle_[id]) {
        for (AX_U32 i = 0; i < ALGO_MAX_NUM; ++i) {
            if (handle_[id][i] != nullptr) {
                ax_algorithm_deinit(handle_[id][i]);
                handle_[id][i] = nullptr;
            }
        }
    }

    LOG_M_D(DETECTOR, "%s: ---", __func__);
    return AX_TRUE;
}

AX_BOOL CDetector::SendFrame(const CAXFrame &axFrame) {
    LOG_MM_I(DETECTOR, "recvfrm vdGrp %d vdChn %d frame %lld pts %lld phy 0x%llx %dx%d stride %d blkId 0x%x\n", axFrame.nGrp, axFrame.nChn,
            axFrame.stFrame.stVFrame.stVFrame.u64SeqNum, axFrame.stFrame.stVFrame.stVFrame.u64PTS,
            axFrame.stFrame.stVFrame.stVFrame.u64PhyAddr[0], axFrame.stFrame.stVFrame.stVFrame.u32Width,
            axFrame.stFrame.stVFrame.stVFrame.u32Height, axFrame.stFrame.stVFrame.stVFrame.u32PicStride[0],
            axFrame.stFrame.stVFrame.stVFrame.u32BlkId[0]);
    if (SkipFrame(axFrame)) {
        LOG_MM_I(DETECTOR, "dropfrm vdGrp %d vdChn %d frame %lld pts %lld phy 0x%llx %dx%d stride %d blkId 0x%x\n", axFrame.nGrp, axFrame.nChn,
                axFrame.stFrame.stVFrame.stVFrame.u64SeqNum, axFrame.stFrame.stVFrame.stVFrame.u64PTS,
                axFrame.stFrame.stVFrame.stVFrame.u64PhyAddr[0], axFrame.stFrame.stVFrame.stVFrame.u32Width,
                axFrame.stFrame.stVFrame.stVFrame.u32Height, axFrame.stFrame.stVFrame.stVFrame.u32PicStride[0],
                axFrame.stFrame.stVFrame.stVFrame.u32BlkId[0]);
        return AX_TRUE;
    }
    axFrame.IncRef();

#if defined(__RECORD_VB_TIMESTAMP__)
    CTimestampHelper::RecordTimestamp(axFrame.stFrame.stVFrame.stVFrame, axFrame.nGrp, axFrame.nChn, TIMESTAMP_SKEL_PUSH_FIFO);
#endif

    if (!m_arrFrameQ[axFrame.nGrp].Push(axFrame)) {
        // LOG_M_E(DETECTOR, "%s: push frame %lld to q fail", __func__, axFrame.stFrame.stVFrame.stVFrame.u64SeqNum);
        axFrame.DecRef();
    }

    return AX_TRUE;
}

AX_BOOL CDetector::SkipFrame(const CAXFrame &axFrame) {
#ifdef __VDEC_PP_FRAME_CTRL__
    return AX_FALSE;
#else
    if (m_stAttr.nSkipRate <= 1) {
        return AX_FALSE;
    }

    if (axFrame.stFrame.stVFrame.stVFrame.u64SeqNum < 3) {
        return AX_TRUE;
    }

    return (1 == (axFrame.stFrame.stVFrame.stVFrame.u64SeqNum % m_stAttr.nSkipRate)) ? AX_FALSE : AX_TRUE;
#endif
}


AX_BOOL CDetector::Clear(AX_VOID) {
    if (m_arrFrameQ) {
        for (AX_U32 i = 0; i < m_stAttr.nChannelNum; ++i) {
            ClearQueue(i);
        }
    }

    return AX_TRUE;
}

AX_VOID CDetector::ClearQueue(AX_S32 nGrp) {
    AX_U32 nCount = m_arrFrameQ[nGrp].GetCount();
    if (nCount > 0) {
        CAXFrame axFrame;
        for (AX_U32 i = 0; i < nCount; ++i) {
            if (m_arrFrameQ[nGrp].Pop(axFrame, 0)) {
                axFrame.DecRef();
            }
        }
    }
}

std::string CDetector::GetCurrentDir() {
    string strPath;
    AX_CHAR szPath[260] = {0};
    ssize_t sz = readlink("/proc/self/exe", szPath, sizeof(szPath));
    if (sz <= 0) {
        strPath = "./";
    } else {
        strPath = szPath;
        strPath = strPath.substr(0, strPath.rfind('/') + 1);
    }

    return strPath;
}
