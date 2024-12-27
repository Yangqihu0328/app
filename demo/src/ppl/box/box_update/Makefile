CUR_PATH		    := $(shell pwd)
HOME_PATH		    := $(abspath $(CUR_PATH)/../../../../../..)

include $(HOME_PATH)/build/color.mk
include $(HOME_PATH)/build/config.mak

PRJ_OUT_HOME        := $(HOME_PATH)/build/out/$(PROJECT)
OBJ_OUT_PATH        := $(PRJ_OUT_HOME)/objs
MSP_OUT_PATH        := $(HOME_PATH)/msp/out
SRC_PATH            := $(CUR_PATH)
LIB_PATH            := $(MSP_OUT_PATH)/lib
INC_PATH            := $(MSP_OUT_PATH)/include
SRC_RELATIVE_PATH   := $(subst $(HOME_PATH)/,,$(SRC_PATH))
TARGET_OUT_PATH     := $(OBJ_OUT_PATH)/$(SRC_RELATIVE_PATH)
ROOTFS_TARGET_PATH  := $(MSP_OUT_PATH)
DEMO_SRC_PATH       := $(HOME_PATH)/app/demo/src
DEMO_BIN_PATH       := $(HOME_PATH)/app/demo/bin/boxdemo
THIRD_PARTY_PATH    := $(HOME_PATH)/third-party
3RD_PATH        	:= $(DEMO_SRC_PATH)/3rd

# output
MOD_NAME            := boxupdate
OUTPUT              := $(TARGET_OUT_PATH)/obj

# source
SRCS                :=
SRCCPPS             := $(wildcard $(SRC_PATH)/*.cpp)

CINCLUDE            := -I$(SRC_PATH) \
                       -I$(DEMO_SRC_PATH)/utils \
                       -I$(3RD_PATH)/inc/openssl/include \
                       -I$(3RD_PATH)/inc/curl \
                       -I$(3RD_PATH)/inc/json \

 OBJS               := $(SRCS:%.c=$(OUTPUT)/%.o)
 CPPOBJS            := $(SRCCPPS:%.cpp=$(OUTPUT)/%.o)

 DEPS               := $(OBJS:%.o=%.d)
 CPPDEPS            := $(CPPOBJS:%.o=%.d)

# exec
TARGET              := $(TARGET_OUT_PATH)/$(MOD_NAME)

# build flags
CPPFLAGS            := --std=c++14
CFLAGS              := $(CPPFLAGS) -Wall -Wl,-rpath-link=$(LIB_PATH)
CFLAGS              += -DAPP_BUILD_VERSION=\"$(SDK_VERSION)\"

ifeq ($(debug),yes)
CFLAGS              += -O0 -ggdb3
else
CFLAGS              += -O2
endif

# dependency
CLIB                := -lstdc++ -pthread -lm -lrt
CLIB                += -L$(LIB_PATH)
CLIB                += -L$(3RD_PATH)/lib/openssl-1.1.1a -lssl -lcrypto
CLIB                += -L$(3RD_PATH)/lib/curl -lcurl

# install
INSTALL_TARGET      := $(TARGET)
INSTALL_TARGET      += $(DEMO_BIN_PATH)/*
INSTALL_DIR         := $(ROOTFS_TARGET_PATH)/bin/BoxDemo

# link
LINK = $(CC)

include $(HOME_PATH)/build/rules.mak

