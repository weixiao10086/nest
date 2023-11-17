/*
 Navicat Premium Data Transfer

 Source Server         : locahost
 Source Server Type    : MySQL
 Source Server Version : 80100
 Source Host           : 192.168.2.23:3306
 Source Schema         : nest

 Target Server Type    : MySQL
 Target Server Version : 80100
 File Encoding         : 65001

 Date: 17/11/2023 10:40:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `courseName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, '2023-10-30 16:24:05.218659', '2023-10-30 16:24:05.218659', NULL, 'string');
INSERT INTO `course` VALUES (2, '2023-10-30 16:24:24.070741', '2023-10-30 16:24:24.070741', NULL, 'string');
INSERT INTO `course` VALUES (3, '2023-10-30 16:31:43.186220', '2023-10-30 16:31:43.186220', NULL, '家志国');
INSERT INTO `course` VALUES (4, '2023-10-30 16:32:43.013727', '2023-10-30 16:32:43.013727', NULL, '储超');
INSERT INTO `course` VALUES (5, '2023-10-30 16:33:06.827694', '2023-10-30 16:33:06.827694', NULL, 'string');
INSERT INTO `course` VALUES (6, '2023-10-30 16:35:03.731041', '2023-10-30 16:35:03.731041', NULL, 'string');
INSERT INTO `course` VALUES (7, '2023-10-30 16:46:55.808079', '2023-10-30 16:46:55.808079', NULL, 'string');
INSERT INTO `course` VALUES (8, '2023-10-30 16:49:21.154431', '2023-10-30 16:49:21.154431', NULL, 'string');
INSERT INTO `course` VALUES (9, '2023-10-30 16:49:30.661202', '2023-10-30 16:49:30.661202', NULL, 'string');
INSERT INTO `course` VALUES (10, '2023-10-30 16:50:21.357103', '2023-10-30 16:50:21.357103', NULL, 'string');
INSERT INTO `course` VALUES (11, '2023-10-30 16:50:50.629000', '2023-10-30 16:50:50.629000', NULL, 'string');
INSERT INTO `course` VALUES (12, '2023-10-30 16:51:10.625126', '2023-10-30 16:51:10.625126', NULL, 'string');
INSERT INTO `course` VALUES (13, '2023-10-30 16:53:00.432973', '2023-10-30 16:53:00.432973', NULL, 'string');
INSERT INTO `course` VALUES (14, '2023-10-30 16:53:35.255820', '2023-10-30 16:53:35.255820', NULL, 'string');
INSERT INTO `course` VALUES (15, '2023-10-30 16:53:47.348032', '2023-10-30 16:53:47.348032', NULL, 'string');
INSERT INTO `course` VALUES (16, '2023-10-30 16:55:57.434131', '2023-10-30 16:55:57.434131', NULL, 'string');
INSERT INTO `course` VALUES (18, '2023-10-30 16:57:57.794140', '2023-10-30 16:57:57.794140', NULL, 'string');
INSERT INTO `course` VALUES (19, '2023-10-30 16:58:14.946639', '2023-10-30 16:58:14.946639', NULL, 'string');
INSERT INTO `course` VALUES (20, '2023-10-30 16:59:33.010442', '2023-10-30 16:59:33.010442', NULL, 'string');
INSERT INTO `course` VALUES (21, '2023-10-30 16:59:59.469182', '2023-10-30 16:59:59.469182', NULL, 'string');
INSERT INTO `course` VALUES (22, '2023-10-30 17:05:30.811055', '2023-10-30 17:05:30.811055', NULL, 'string');
INSERT INTO `course` VALUES (23, '2023-10-30 17:06:18.422069', '2023-10-30 17:06:18.422069', NULL, 'string');
INSERT INTO `course` VALUES (24, '2023-10-30 17:09:23.515445', '2023-10-30 17:09:23.515445', NULL, 'string');
INSERT INTO `course` VALUES (27, '2023-10-30 17:10:25.328476', '2023-10-30 17:10:25.328476', NULL, 'string');
INSERT INTO `course` VALUES (28, '2023-10-30 17:26:28.936783', '2023-10-30 17:26:28.936783', NULL, 'string');
INSERT INTO `course` VALUES (30, '2023-10-30 17:26:55.073363', '2023-10-30 17:26:55.073363', NULL, 'string');
INSERT INTO `course` VALUES (31, '2023-10-30 17:28:29.355364', '2023-10-30 17:28:29.355364', NULL, 'string');

-- ----------------------------
-- Table structure for course_infos_info
-- ----------------------------
DROP TABLE IF EXISTS `course_infos_info`;
CREATE TABLE `course_infos_info`  (
  `courseId` int(0) NOT NULL,
  `infoId` int(0) NOT NULL,
  PRIMARY KEY (`courseId`, `infoId`) USING BTREE,
  INDEX `IDX_003e9ffdcb7de4a82649d68c63`(`courseId`) USING BTREE,
  INDEX `IDX_c210781d82f80b39e478baca56`(`infoId`) USING BTREE,
  CONSTRAINT `FK_003e9ffdcb7de4a82649d68c63b` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_c210781d82f80b39e478baca562` FOREIGN KEY (`infoId`) REFERENCES `info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course_infos_info
-- ----------------------------
INSERT INTO `course_infos_info` VALUES (23, 28);
INSERT INTO `course_infos_info` VALUES (24, 29);
INSERT INTO `course_infos_info` VALUES (27, 30);

-- ----------------------------
-- Table structure for info
-- ----------------------------
DROP TABLE IF EXISTS `info`;
CREATE TABLE `info`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isActive` tinyint(0) NOT NULL DEFAULT 1,
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of info
-- ----------------------------
INSERT INTO `info` VALUES (5, '羽桂兰', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (6, 'string', '1654', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (7, '全慧', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (8, '佘呈轩', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (9, '夏政君', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (10, '贵浩辰', 'string', 1, '2023-10-30 14:59:54.790505', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (11, '邸雯静', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (12, '隋国栋', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (13, '仍浩轩', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (14, '舜帅', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (15, '熊一全', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (16, '疏雯静', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (17, '伦癸霖', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (18, '崇中海', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (19, '浦勇', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (20, '板俊凯', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (21, '帖梓妍', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (22, '陶雨欣', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (23, '千玉梅', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (24, '蒿诚', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (25, '寒梓浩', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (26, '芮治涛', 'string', 1, '2023-10-23 17:22:40.562133', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (27, '阳榕融', 'string', 1, '2023-10-23 17:22:47.454651', NULL, '2023-10-30 15:05:24.845467');
INSERT INTO `info` VALUES (28, 'string', 'string', 1, '2023-10-30 17:06:18.434217', NULL, '2023-10-30 17:06:18.434217');
INSERT INTO `info` VALUES (29, 'string', 'string', 1, '2023-10-30 17:09:23.523589', NULL, '2023-10-30 17:09:23.523589');
INSERT INTO `info` VALUES (30, 'string', 'string', 1, '2023-10-30 17:10:25.332734', NULL, '2023-10-30 17:10:25.332734');

-- ----------------------------
-- Table structure for photo
-- ----------------------------
DROP TABLE IF EXISTS `photo`;
CREATE TABLE `photo`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` int(0) NULL DEFAULT NULL COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_4494006ff358f754d07df5ccc87`(`userId`) USING BTREE,
  CONSTRAINT `FK_4494006ff358f754d07df5ccc87` FOREIGN KEY (`userId`) REFERENCES `info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of photo
-- ----------------------------
INSERT INTO `photo` VALUES (1, '2023-10-30 13:21:09.863273', NULL, 'string', 5, '2023-10-30 15:05:24.822039');
INSERT INTO `photo` VALUES (2, '2023-10-23 17:49:12.891612', NULL, 'string', 5, '2023-10-30 15:05:24.822039');

-- ----------------------------
-- Table structure for typeorm_metadata
-- ----------------------------
DROP TABLE IF EXISTS `typeorm_metadata`;
CREATE TABLE `typeorm_metadata`  (
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `database` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `schema` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `table` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of typeorm_metadata
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '2023-11-10 10:33:13.537027', '2023-11-10 10:33:13.537027', NULL, 'john', 'changeme');

SET FOREIGN_KEY_CHECKS = 1;
