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
#include <string.h>
#include <map>
#include <mutex>
#include <iostream>
#include <set>
#include <vector>
#include <unordered_set>
#include "AXSingleton.h"
#include "ax_skel_type.h"

#define MAX_DETECT_RESULT_COUNT (32)
#define MAX_CHANNEL_SIZE (16)
#define MAX_RESULT_SIZE (5)

//临时写一个算法列表，火焰，动物，手势，抽烟
typedef enum {
    DETECT_TYPE_PEOPLE = 0,
    DETECT_TYPE_VEHICLE = 1,
    DETECT_TYPE_FACE = 2,
    DETECT_TYPE_FIRE = 3,
    DETECT_TYPE_TOTAL
} DETECT_TYPE_E;

struct _ax_point_t{
    float x, y;
};

#define _FACE_POINT_LEN 5
typedef struct {
    struct FaceInfo {
        /*
        0到1之间的值，表示人脸质量，越高越好
        */
        float quality;
        _ax_point_t points[_FACE_POINT_LEN];
    } face_info;

    struct PersonInfo {
        /*
        人体状态： 0：正面， 1：侧面，2：背面， 3：非人
        */
        int status;
    } person_info;

    struct FireSmokeInfo {
        /**
        火、烟、其他
        */
        int label;
    } fire_smoke_info;

    struct VehicleInfo {
        /*
        车辆类型: 0：UNKNOWN 1：SEDAN 2：SUV 3：BUS 4：MICROBUS 5：TRUCK
        */
        int cartype;

        /*
        如果 b_is_track_plate = 1，则表示当前帧没有识别到车牌，返回的是历史上 track_id 上一次识别到的车牌结果
        如果 b_is_track_plate = 0，且 len_plate_id > 0, 则表示当前帧识别到了车牌
        如果 b_is_track_plate = 0，且 len_plate_id = 0, 则表示当前帧没有识别到车牌，且是历史上 track_id 也没有结果
        */
        int b_is_track_plate;
        int len_plate_id;
        int plate_id[16];
    } vehicle_info;
} AlgoData;

typedef struct {
    DETECT_TYPE_E eType;
    AX_F32 fScore;
    AX_U64 nTrackId;
    AX_SKEL_RECT_T tBox;
    AlgoData data;
} DETECT_RESULT_ITEM_T;

typedef struct DETECT_RESULT_S {
    AX_U64 nSeqNum;
    AX_U32 nW;
    AX_U32 nH;
    AX_U32 nCount;
    AX_S32 nGrpId;
    AX_U32 nAlgoType;
    AX_BOOL result_diff;
    DETECT_RESULT_ITEM_T item[MAX_DETECT_RESULT_COUNT];

    DETECT_RESULT_S(AX_VOID) {
        memset(this, 0, sizeof(*this));
    }

} DETECT_RESULT_T;

/**
 * @brief
 *
 */
class CDetectResult : public CAXSingleton<CDetectResult> {
    friend class CAXSingleton<CDetectResult>;

public:
    AX_BOOL Set(AX_S32 nGrp, const DETECT_RESULT_T& result) {
        std::lock_guard<std::mutex> lck(m_mtx);
        DETECT_RESULT_T new_result = result;

        auto& save_result = m_mapRlts[nGrp][result.nAlgoType];
        auto& trackIdSet = m_trackIdSets[nGrp][result.nAlgoType];

        //记录当前结果所有的track_id，并判断是否为新的track id
        std::unordered_set<AX_S32> currentTrackIds;
        for (const auto& newItem : result.item) {
            if (trackIdSet.find(newItem.nTrackId) == trackIdSet.end()) {
                new_result.result_diff = AX_TRUE;
            }
            trackIdSet.insert(newItem.nTrackId);
            currentTrackIds.insert(newItem.nTrackId);
        }

        // 遍历 trackIdSet，并删除那些不在当前 result 中的 trackId
        std::unordered_set<AX_S32> toDelete;  // 临时集合，存储需要删除的 trackId
        for (auto it = trackIdSet.begin(); it != trackIdSet.end();++it) {
            AX_S32 trackId = *it;
            // 如果这个 trackId 不在当前 result 中，标记为删除
            if (currentTrackIds.find(trackId) == currentTrackIds.end()) {
                toDelete.insert(trackId);
            }
        }

        while (trackIdSet.size() > track_length) {
            // 删除不在当前 result 中的 trackId
            if (!toDelete.empty()) {
                // 先删除那些不在当前结果中的 trackId
                AX_S32 trackIdToRemove = *toDelete.begin();
                trackIdSet.erase(trackIdToRemove);
                toDelete.erase(trackIdToRemove);  // 移除已删除的 trackId
            } else {
                auto it = trackIdSet.begin();
                trackIdSet.erase(it);  // 删除最旧的 trackId
            }
        }

        save_result = new_result;
        return AX_TRUE;

    }

    AX_BOOL Get(AX_S32 nGrp, DETECT_RESULT_T& result) {
        std::lock_guard<std::mutex> lck(m_mtx);

        auto grpIt = m_mapRlts.find(nGrp);
        if (grpIt == m_mapRlts.end()) {
            return AX_FALSE;
        }

        auto& grp_result = grpIt->second;
        for (auto algoIt = grp_result.begin(); algoIt != grp_result.end(); ) {
            if (algoIt->second.nAlgoType != DETECT_TYPE_TOTAL) {
                result = algoIt->second;

                algoIt = grp_result.erase(algoIt);
                return AX_TRUE;
            } else {
                ++algoIt;
            }
        }

        return AX_FALSE;
    }

    AX_VOID Clear(AX_VOID) {
        std::lock_guard<std::mutex> lck(m_mtx);
        m_mapRlts.clear();
    }

protected:
    CDetectResult(AX_VOID)  = default;
    virtual ~CDetectResult(AX_VOID) = default;

private:
    AX_U32 track_length = 30;
    std::mutex m_mtx;
    std::map<AX_S32, std::map<AX_S32, DETECT_RESULT_T>> m_mapRlts;
    std::map<AX_S32, std::map<AX_S32, std::unordered_set<AX_S32>>> m_trackIdSets;
};
