/**************************************************************************************************
 *
 * Copyright (c) 2019-2023 Axera Semiconductor (Shanghai) Co., Ltd. All Rights Reserved.
 *
 * This source file is the property of Axera Semiconductor (Shanghai) Co., Ltd. and
 * may not be copied or distributed in any isomorphic form without the prior
 * written consent of Axera Semiconductor (Shanghai) Co., Ltd.
 *
 **************************************************************************************************/

#pragma once
#include <vector>
#include <thread>

#include "AXFrame.hpp"
#include "AXLockQ.hpp"
#include "AXResource.hpp"
#include "AXThread.hpp"
#include "ax_skel_api.h"
#include "ax_global_type.h"
#include "ax_algorithm_sdk.h"
#include "BoxMediaParser.hpp"

#define DETECTOR_MAX_CHN_NUM 16
#define ALGO_MAX_NUM 3

typedef enum {
    AX_PPL_PEOPLE = 4,              /* hvcfp detection pipeline */
    AXPPL_MAX,
} AX_PPL_E;

typedef struct DETECTOR_CHN_ATTR_S {
    ax_color_space_e color_space;
    AX_U32 nPPL[3];

    DETECTOR_CHN_ATTR_S(AX_VOID) {
        color_space = ax_color_space_unknown;
        nPPL[0] = AX_PPL_PEOPLE;
        nPPL[1] = AX_PPL_PEOPLE;
        nPPL[2] = AX_PPL_PEOPLE;
    }
} DETECTOR_CHN_ATTR_T;

typedef struct DETECTOR_ATTR_S {
    AX_U32 nW;
    AX_U32 nH;
    AX_S32 nDepth;
    AX_U32 nChannelNum;
    AX_S32 nSkipRate;
    DETECTOR_CHN_ATTR_T tChnAttr[DETECTOR_MAX_CHN_NUM];
    std::string strModelPath;
    AX_IMG_FORMAT_E video_format;

    DETECTOR_ATTR_S(AX_VOID) {
        nW = 0;
        nH = 0;
        nDepth = 1;
        nChannelNum = 1;
        nSkipRate = 1;
    }
} DETECTOR_ATTR_T;

class CDetector {
public:
    CDetector(AX_VOID) = default;

    AX_BOOL Init(const DETECTOR_ATTR_T& stAttr);
    AX_BOOL DeInit(AX_VOID);

    AX_BOOL Start(AX_VOID);
    AX_BOOL Stop(AX_VOID);

    AX_BOOL StartId(int id);
    AX_BOOL StopId(int id);

    AX_BOOL Clear(AX_VOID);

    AX_BOOL SendFrame(const CAXFrame& axFrame);

protected:
    AX_BOOL SkipFrame(const CAXFrame& axFrame);
    AX_VOID RunDetect(AX_VOID* pArg);
    AX_VOID WorkerThread(AX_U32 tid);
    AX_VOID ClearQueue(AX_S32 nGrp);

private:
    std::string GetCurrentDir();

protected:
    DETECTOR_ATTR_T m_stAttr;
    CAXLockQ<CAXFrame>* m_arrFrameQ{nullptr};
    
    ax_algorithm_handle_t handle_[DETECTOR_MAX_CHN_NUM][ALGO_MAX_NUM]{NULL};

    std::vector<std::thread> detect_threads_;
    std::atomic<AX_BOOL> stop_ = {AX_FALSE};
};
