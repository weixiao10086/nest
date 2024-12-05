/*
 Navicat Premium Data Transfer

 Source Server         : mysql-localhost
 Source Server Type    : MySQL
 Source Server Version : 80200
 Source Host           : localhost:3306
 Source Schema         : nest

 Target Server Type    : MySQL
 Target Server Version : 80200
 File Encoding         : 65001

 Date: 05/12/2024 15:34:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '部门名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '编码',
  `bak` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态',
  `parentId` bigint(0) NULL DEFAULT NULL COMMENT '父级',
  `deptId` bigint(0) NULL DEFAULT NULL COMMENT '权限id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_889b72920d0e1dcb01aedbf2976`(`parentId`) USING BTREE,
  CONSTRAINT `FK_889b72920d0e1dcb01aedbf2976` FOREIGN KEY (`parentId`) REFERENCES `dept` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES (1, '2024-04-30 15:48:32.597017', '2024-12-04 16:09:50.267442', NULL, '1', NULL, '部门1', '111', NULL, '1', NULL, 1);
INSERT INTO `dept` VALUES (2, '2024-04-30 15:48:44.734375', '2024-12-04 16:09:51.990763', NULL, '1', NULL, '部门1-1', '111', NULL, '1', 1, 2);
INSERT INTO `dept` VALUES (3, '2024-05-06 10:48:53.218328', '2024-12-04 16:09:52.652465', NULL, '1', NULL, '部门2', '2', NULL, '1', NULL, 3);
INSERT INTO `dept` VALUES (4, '2024-05-06 10:49:13.634193', '2024-12-04 16:09:53.462156', NULL, '1', NULL, '部门2-1', '21', NULL, '1', 3, 4);
INSERT INTO `dept` VALUES (11, '2024-07-23 16:54:30.505815', '2024-12-04 16:09:55.101289', '2024-07-23 16:55:55.000000', '1', '1', '部门-测试', '111', NULL, '1', 3, 11);

-- ----------------------------
-- Table structure for dept_closure
-- ----------------------------
DROP TABLE IF EXISTS `dept_closure`;
CREATE TABLE `dept_closure`  (
  `id_ancestor` bigint(0) NOT NULL,
  `id_descendant` bigint(0) NOT NULL,
  PRIMARY KEY (`id_ancestor`, `id_descendant`) USING BTREE,
  INDEX `IDX_860e3855659f2244c2bf07f707`(`id_ancestor`) USING BTREE,
  INDEX `IDX_ed283b3ca8d140be0c99cf4a4c`(`id_descendant`) USING BTREE,
  CONSTRAINT `FK_860e3855659f2244c2bf07f7070` FOREIGN KEY (`id_ancestor`) REFERENCES `dept` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_ed283b3ca8d140be0c99cf4a4c5` FOREIGN KEY (`id_descendant`) REFERENCES `dept` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dept_closure
-- ----------------------------
INSERT INTO `dept_closure` VALUES (1, 1);
INSERT INTO `dept_closure` VALUES (1, 2);
INSERT INTO `dept_closure` VALUES (2, 2);
INSERT INTO `dept_closure` VALUES (3, 3);
INSERT INTO `dept_closure` VALUES (3, 4);
INSERT INTO `dept_closure` VALUES (3, 11);
INSERT INTO `dept_closure` VALUES (4, 4);
INSERT INTO `dept_closure` VALUES (11, 11);

-- ----------------------------
-- Table structure for dict
-- ----------------------------
DROP TABLE IF EXISTS `dict`;
CREATE TABLE `dict`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典key',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典value',
  `dictsId` bigint(0) NOT NULL COMMENT '所属字典',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_1590c950b8a3d0e35685fc71c6`(`key`, `dictsId`) USING BTREE,
  INDEX `FK_b25d68ff804f4abbbd7348fe947`(`dictsId`) USING BTREE,
  CONSTRAINT `FK_b25d68ff804f4abbbd7348fe947` FOREIGN KEY (`dictsId`) REFERENCES `dicts` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict
-- ----------------------------
INSERT INTO `dict` VALUES (1, '2024-04-18 10:20:08.109752', '2024-12-04 15:34:34.807416', NULL, '1', '1', '1', '正常', 1);
INSERT INTO `dict` VALUES (2, '2024-04-18 10:20:18.107787', '2024-12-04 15:34:34.812651', NULL, '1', NULL, '0', '禁用', 1);
INSERT INTO `dict` VALUES (3, '2024-04-25 17:21:48.326002', '2024-12-04 15:34:34.815559', NULL, '1', NULL, '1', '菜单', 2);
INSERT INTO `dict` VALUES (4, '2024-04-25 17:21:55.648532', '2024-12-04 15:34:34.818168', NULL, '1', NULL, '2', '按钮', 2);
INSERT INTO `dict` VALUES (7, '2024-04-29 10:01:10.746674', '2024-12-04 15:34:34.821699', NULL, '1', NULL, '1', '男', 5);
INSERT INTO `dict` VALUES (8, '2024-04-29 10:01:15.964354', '2024-12-04 15:34:34.824337', NULL, '1', NULL, '0', '女', 5);
INSERT INTO `dict` VALUES (9, '2024-04-30 11:02:06.002015', '2024-12-04 15:34:34.827475', NULL, '1', NULL, '1', '全部数据', 6);
INSERT INTO `dict` VALUES (10, '2024-04-30 11:02:12.686762', '2024-12-04 15:34:34.830084', NULL, '1', NULL, '2', '自定义数据', 6);
INSERT INTO `dict` VALUES (11, '2024-04-30 11:02:18.318760', '2024-12-04 15:34:34.832698', NULL, '1', NULL, '3', '本级及子级', 6);
INSERT INTO `dict` VALUES (12, '2024-04-30 11:02:24.584163', '2024-12-04 15:34:34.835176', NULL, '1', NULL, '4', '本级', 6);
INSERT INTO `dict` VALUES (13, '2024-04-30 11:02:29.938829', '2024-12-04 15:34:34.838599', NULL, '1', NULL, '5', '本人数据', 6);
INSERT INTO `dict` VALUES (14, '2024-05-09 09:28:25.294460', '2024-12-04 15:34:34.841340', NULL, '1', NULL, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'word', 7);
INSERT INTO `dict` VALUES (15, '2024-05-09 09:28:34.370591', '2024-12-04 15:34:34.844161', NULL, '1', NULL, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'excel', 7);
INSERT INTO `dict` VALUES (18, '2024-05-10 09:12:52.694555', '2024-12-04 15:34:34.846688', NULL, '1', NULL, 'image/vnd.microsoft.icon', 'image/ico', 7);
INSERT INTO `dict` VALUES (21, '2024-05-11 09:07:32.457779', '2024-12-04 15:34:34.849391', NULL, '1', NULL, 'image/jpeg', 'image/jepg', 7);
INSERT INTO `dict` VALUES (24, '2024-05-13 16:46:12.069272', '2024-12-04 15:34:34.852368', NULL, '1', NULL, '1', '分组1', 8);
INSERT INTO `dict` VALUES (25, '2024-05-13 16:46:16.517057', '2024-12-04 15:34:34.855758', NULL, '1', NULL, '2', '分组2', 8);
INSERT INTO `dict` VALUES (26, '2024-08-05 15:13:40.909369', '2024-12-04 15:34:34.858300', NULL, '1', NULL, '1', '系统参数', 9);
INSERT INTO `dict` VALUES (28, '2024-08-05 15:18:45.935945', '2024-12-04 15:34:34.861390', NULL, '1', NULL, '2', '自建参数', 9);

-- ----------------------------
-- Table structure for dicts
-- ----------------------------
DROP TABLE IF EXISTS `dicts`;
CREATE TABLE `dicts`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典名',
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典key',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dicts
-- ----------------------------
INSERT INTO `dicts` VALUES (1, '2024-04-17 16:30:11.559177', '2024-05-06 10:18:53.923217', NULL, NULL, NULL, '账号状态', 'status');
INSERT INTO `dicts` VALUES (2, '2024-04-25 17:13:54.639737', '2024-05-06 10:18:53.927294', NULL, NULL, NULL, '路由类型', 'routerType');
INSERT INTO `dicts` VALUES (5, '2024-04-29 10:00:43.378602', '2024-05-06 10:18:53.931297', NULL, NULL, NULL, '性别', 'gender');
INSERT INTO `dicts` VALUES (6, '2024-04-30 11:01:44.158628', '2024-05-06 10:18:53.936575', NULL, NULL, NULL, '权限标识', 'powerkey');
INSERT INTO `dicts` VALUES (7, '2024-05-09 09:27:44.133342', '2024-05-09 09:27:44.133342', NULL, NULL, NULL, '文件类型', 'filetype');
INSERT INTO `dicts` VALUES (8, '2024-05-13 16:45:05.323834', '2024-08-05 15:18:08.320633', NULL, NULL, NULL, '参数分组', 'paramsGroup');
INSERT INTO `dicts` VALUES (9, '2024-05-13 16:45:05.323834', '2024-09-27 10:57:27.888175', NULL, NULL, '1', '参数类型', 'paramsType');

-- ----------------------------
-- Table structure for logs
-- ----------------------------
DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `deptId` bigint(0) NULL DEFAULT NULL COMMENT '权限id',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'ip',
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求方式',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'url请求路径',
  `statusCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '状态码',
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'body请求体',
  `query` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'query参数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 735 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of logs
-- ----------------------------
INSERT INTO `logs` VALUES (391, '2024-12-04 14:29:46.107155', '2024-12-04 14:29:46.107155', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (392, '2024-12-04 14:29:46.130050', '2024-12-04 14:29:46.130050', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (393, '2024-12-04 14:29:46.417990', '2024-12-04 14:29:46.417990', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (394, '2024-12-04 14:49:46.133493', '2024-12-04 14:49:46.133493', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/params/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (395, '2024-12-04 14:49:48.209761', '2024-12-04 14:49:48.209761', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (396, '2024-12-04 14:49:48.525391', '2024-12-04 14:49:48.525391', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (397, '2024-12-04 14:49:48.531690', '2024-12-04 14:49:48.531690', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (398, '2024-12-04 14:49:49.955901', '2024-12-04 14:49:49.955901', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/params/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (399, '2024-12-04 14:50:22.220318', '2024-12-04 14:50:22.220318', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (400, '2024-12-04 14:50:22.531590', '2024-12-04 14:50:22.531590', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (401, '2024-12-04 14:50:26.371673', '2024-12-04 14:50:26.371673', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (402, '2024-12-04 14:50:27.896931', '2024-12-04 14:50:27.896931', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (403, '2024-12-04 14:51:38.954319', '2024-12-04 14:51:38.954319', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (404, '2024-12-04 14:51:39.141431', '2024-12-04 14:51:39.141431', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (405, '2024-12-04 14:51:39.149466', '2024-12-04 14:51:39.149466', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (406, '2024-12-04 14:51:39.522448', '2024-12-04 14:51:39.522448', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (407, '2024-12-04 14:51:39.530203', '2024-12-04 14:51:39.530203', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (408, '2024-12-04 14:51:41.381178', '2024-12-04 14:51:41.381178', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (409, '2024-12-04 14:51:42.795398', '2024-12-04 14:51:42.795398', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (410, '2024-12-04 14:51:46.738187', '2024-12-04 14:51:46.738187', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (411, '2024-12-04 14:51:55.270569', '2024-12-04 14:51:55.270569', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (412, '2024-12-04 14:51:55.331528', '2024-12-04 14:51:55.331528', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (413, '2024-12-04 14:51:55.341349', '2024-12-04 14:51:55.341349', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (414, '2024-12-04 14:51:55.617438', '2024-12-04 14:51:55.617438', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (415, '2024-12-04 14:51:55.626646', '2024-12-04 14:51:55.626646', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (416, '2024-12-04 14:51:57.816642', '2024-12-04 14:51:57.816642', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (417, '2024-12-04 14:52:01.643293', '2024-12-04 14:52:01.643293', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (418, '2024-12-04 14:52:01.790759', '2024-12-04 14:52:01.790759', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (419, '2024-12-04 14:52:01.797894', '2024-12-04 14:52:01.797894', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (420, '2024-12-04 14:52:02.191664', '2024-12-04 14:52:02.191664', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (421, '2024-12-04 14:52:02.199739', '2024-12-04 14:52:02.199739', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (422, '2024-12-04 14:52:04.337762', '2024-12-04 14:52:04.337762', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (423, '2024-12-04 14:53:00.430438', '2024-12-04 14:53:00.430438', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (424, '2024-12-04 14:53:00.721694', '2024-12-04 14:53:00.721694', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (425, '2024-12-04 14:53:00.729472', '2024-12-04 14:53:00.729472', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (426, '2024-12-04 14:53:01.139660', '2024-12-04 14:53:01.139660', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (427, '2024-12-04 14:53:01.151204', '2024-12-04 14:53:01.151204', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (428, '2024-12-04 14:53:05.499989', '2024-12-04 14:53:05.499989', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (429, '2024-12-04 14:53:14.701748', '2024-12-04 14:53:14.701748', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (430, '2024-12-04 14:53:25.220227', '2024-12-04 14:53:25.220227', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (431, '2024-12-04 14:53:25.402153', '2024-12-04 14:53:25.402153', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (432, '2024-12-04 14:53:25.407762', '2024-12-04 14:53:25.407762', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (433, '2024-12-04 14:53:25.744620', '2024-12-04 14:53:25.744620', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (434, '2024-12-04 14:53:25.759077', '2024-12-04 14:53:25.759077', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (435, '2024-12-04 14:53:29.229066', '2024-12-04 14:53:29.229066', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (436, '2024-12-04 14:53:40.833425', '2024-12-04 14:53:40.833425', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (437, '2024-12-04 14:53:41.108266', '2024-12-04 14:53:41.108266', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (438, '2024-12-04 14:53:41.125769', '2024-12-04 14:53:41.125769', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (439, '2024-12-04 14:53:41.466691', '2024-12-04 14:53:41.466691', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (440, '2024-12-04 14:53:41.474153', '2024-12-04 14:53:41.474153', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (441, '2024-12-04 14:53:44.581546', '2024-12-04 14:53:44.581546', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (442, '2024-12-04 14:54:04.487955', '2024-12-04 14:54:04.487955', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (443, '2024-12-04 14:54:04.710731', '2024-12-04 14:54:04.710731', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (444, '2024-12-04 14:54:04.724221', '2024-12-04 14:54:04.724221', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (445, '2024-12-04 14:54:05.135588', '2024-12-04 14:54:05.135588', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (446, '2024-12-04 14:54:05.141028', '2024-12-04 14:54:05.141028', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (447, '2024-12-04 14:54:33.766634', '2024-12-04 14:54:33.766634', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (448, '2024-12-04 14:54:35.295110', '2024-12-04 14:54:35.295110', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (449, '2024-12-04 14:54:41.435664', '2024-12-04 14:54:41.435664', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (450, '2024-12-04 14:54:41.500893', '2024-12-04 14:54:41.500893', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (451, '2024-12-04 14:54:41.514274', '2024-12-04 14:54:41.514274', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (452, '2024-12-04 14:54:41.845916', '2024-12-04 14:54:41.845916', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (453, '2024-12-04 14:54:41.851658', '2024-12-04 14:54:41.851658', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (454, '2024-12-04 14:55:00.698260', '2024-12-04 14:55:00.698260', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (455, '2024-12-04 14:55:26.515382', '2024-12-04 14:55:26.515382', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (456, '2024-12-04 14:55:26.767469', '2024-12-04 14:55:26.767469', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (457, '2024-12-04 14:55:26.773601', '2024-12-04 14:55:26.773601', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (458, '2024-12-04 14:55:27.258626', '2024-12-04 14:55:27.258626', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (459, '2024-12-04 14:55:27.272832', '2024-12-04 14:55:27.272832', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (460, '2024-12-04 14:55:30.201657', '2024-12-04 14:55:30.201657', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (461, '2024-12-04 14:55:41.392475', '2024-12-04 14:55:41.392475', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (462, '2024-12-04 14:55:41.450059', '2024-12-04 14:55:41.450059', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (463, '2024-12-04 14:55:41.456308', '2024-12-04 14:55:41.456308', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (464, '2024-12-04 14:55:42.522533', '2024-12-04 14:55:42.522533', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (465, '2024-12-04 14:55:42.530157', '2024-12-04 14:55:42.530157', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (466, '2024-12-04 14:55:48.134184', '2024-12-04 14:55:48.134184', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (467, '2024-12-04 14:56:33.424122', '2024-12-04 14:56:33.424122', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (468, '2024-12-04 14:56:33.466180', '2024-12-04 14:56:33.466180', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (469, '2024-12-04 14:56:36.628116', '2024-12-04 14:56:36.628116', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (470, '2024-12-04 14:56:36.864467', '2024-12-04 14:56:36.864467', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (471, '2024-12-04 14:56:36.874537', '2024-12-04 14:56:36.874537', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (472, '2024-12-04 14:56:37.270624', '2024-12-04 14:56:37.270624', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (473, '2024-12-04 14:56:37.276701', '2024-12-04 14:56:37.276701', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (474, '2024-12-04 14:56:39.561406', '2024-12-04 14:56:39.561406', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"3\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (475, '2024-12-04 14:56:39.593840', '2024-12-04 14:56:39.593840', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (476, '2024-12-04 14:56:40.758376', '2024-12-04 14:56:40.758376', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"4\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (477, '2024-12-04 14:56:40.778535', '2024-12-04 14:56:40.778535', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (478, '2024-12-04 14:56:42.148043', '2024-12-04 14:56:42.148043', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"5\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (479, '2024-12-04 14:56:42.413320', '2024-12-04 14:56:42.413320', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (480, '2024-12-04 14:56:43.595657', '2024-12-04 14:56:43.595657', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"6\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (481, '2024-12-04 14:56:43.926688', '2024-12-04 14:56:43.926688', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (482, '2024-12-04 14:56:46.143211', '2024-12-04 14:56:46.143211', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"7\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (483, '2024-12-04 14:56:46.469671', '2024-12-04 14:56:46.469671', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (484, '2024-12-04 14:56:47.593938', '2024-12-04 14:56:47.593938', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"8\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (485, '2024-12-04 14:56:47.917621', '2024-12-04 14:56:47.917621', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (486, '2024-12-04 14:56:49.049535', '2024-12-04 14:56:49.049535', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"9\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (487, '2024-12-04 14:56:49.379492', '2024-12-04 14:56:49.379492', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (488, '2024-12-04 14:56:50.701622', '2024-12-04 14:56:50.701622', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"10\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (489, '2024-12-04 14:56:51.023890', '2024-12-04 14:56:51.023890', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (490, '2024-12-04 14:56:52.372535', '2024-12-04 14:56:52.372535', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"11\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (491, '2024-12-04 14:56:52.703471', '2024-12-04 14:56:52.703471', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (492, '2024-12-04 14:56:54.255041', '2024-12-04 14:56:54.255041', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"12\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (493, '2024-12-04 14:56:54.583246', '2024-12-04 14:56:54.583246', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (494, '2024-12-04 14:56:56.189235', '2024-12-04 14:56:56.189235', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'DELETE', '/xxx/remove', '200', '\"{\\\"id\\\":\\\"13\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (495, '2024-12-04 14:56:56.515971', '2024-12-04 14:56:56.515971', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (496, '2024-12-04 14:57:03.842058', '2024-12-04 14:57:03.842058', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'POST', '/xxx/add', '200', '\"{\\\"deptId\\\":\\\"1\\\",\\\"ceshi\\\":\\\"1\\\",\\\"name\\\":\\\"11\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (497, '2024-12-04 14:57:04.190494', '2024-12-04 14:57:04.190494', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (498, '2024-12-04 15:00:43.538555', '2024-12-04 15:00:43.538555', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/routerType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (499, '2024-12-04 15:00:43.544358', '2024-12-04 15:00:43.544358', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (500, '2024-12-04 15:05:01.324223', '2024-12-04 15:05:01.324223', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (501, '2024-12-04 15:05:01.557894', '2024-12-04 15:05:01.557894', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (502, '2024-12-04 15:05:01.565035', '2024-12-04 15:05:01.565035', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (503, '2024-12-04 15:05:02.021152', '2024-12-04 15:05:02.021152', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/routerType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (504, '2024-12-04 15:05:02.027847', '2024-12-04 15:05:02.027847', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (505, '2024-12-04 15:17:19.935342', '2024-12-04 15:17:19.935342', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (506, '2024-12-04 15:17:20.216668', '2024-12-04 15:17:20.216668', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (507, '2024-12-04 15:17:20.263325', '2024-12-04 15:17:20.263325', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (508, '2024-12-04 15:17:20.911315', '2024-12-04 15:17:20.911315', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (509, '2024-12-04 15:17:20.916511', '2024-12-04 15:17:20.916511', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/routerType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (510, '2024-12-04 15:34:44.720588', '2024-12-04 15:34:44.720588', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (511, '2024-12-04 15:34:44.751422', '2024-12-04 15:34:44.751422', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (512, '2024-12-04 15:34:45.009613', '2024-12-04 15:34:45.009613', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (513, '2024-12-04 15:34:47.577171', '2024-12-04 15:34:47.577171', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/paramsType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (514, '2024-12-04 15:34:47.878854', '2024-12-04 15:34:47.878854', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/paramsGroup', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (515, '2024-12-04 15:34:47.885626', '2024-12-04 15:34:47.885626', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/params/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (516, '2024-12-04 15:34:49.922864', '2024-12-04 15:34:49.922864', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (517, '2024-12-04 15:34:49.927489', '2024-12-04 15:34:49.927489', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (518, '2024-12-04 15:34:50.235725', '2024-12-04 15:34:50.235725', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (519, '2024-12-04 15:34:50.239555', '2024-12-04 15:34:50.239555', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (520, '2024-12-04 15:34:52.211714', '2024-12-04 15:34:52.211714', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/info/1', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (521, '2024-12-04 15:34:58.478915', '2024-12-04 15:34:58.478915', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'PATCH', '/roles/update', '200', '\"{\\\"id\\\":\\\"1\\\",\\\"createTime\\\":\\\"2024-04-30 10:58:03.088316\\\",\\\"updateTime\\\":\\\"2024-12-02 10:44:05.000000\\\",\\\"createBy\\\":null,\\\"updateBy\\\":\\\"1\\\",\\\"name\\\":\\\"管理员\\\",\\\"powerkey\\\":\\\"5\\\",\\\"deptArr\\\":[\\\"3\\\",\\\"4\\\"],\\\"bak\\\":\\\"11\\\",\\\"routers\\\":[\\\"23\\\",\\\"25\\\",\\\"26\\\",\\\"27\\\",\\\"28\\\",\\\"29\\\",\\\"30\\\",\\\"31\\\",\\\"32\\\",\\\"51\\\"]}\"', '\"{}\"');
INSERT INTO `logs` VALUES (522, '2024-12-04 15:34:59.043045', '2024-12-04 15:34:59.043045', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (523, '2024-12-04 15:35:03.984701', '2024-12-04 15:35:03.984701', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'POST', '/auth/loginOut', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (524, '2024-12-04 15:35:04.408280', '2024-12-04 15:35:04.408280', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/code', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (525, '2024-12-04 15:35:05.306564', '2024-12-04 15:35:05.306564', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'POST', '/auth/login', '200', '\"{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"123456\\\",\\\"code\\\":\\\"8888\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (526, '2024-12-04 15:35:05.628933', '2024-12-04 15:35:05.628933', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (527, '2024-12-04 15:35:05.894780', '2024-12-04 15:35:05.894780', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (528, '2024-12-04 15:35:06.019729', '2024-12-04 15:35:06.019729', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (529, '2024-12-04 15:35:10.538002', '2024-12-04 15:35:10.538002', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/routerType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (530, '2024-12-04 15:35:10.543064', '2024-12-04 15:35:10.543064', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (531, '2024-12-04 15:35:15.058485', '2024-12-04 15:35:15.058485', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (532, '2024-12-04 15:35:16.208559', '2024-12-04 15:35:16.208559', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dict/list', '200', '\"{}\"', '\"{\\\"dicts\\\":\\\"1\\\",\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (533, '2024-12-04 15:35:18.996637', '2024-12-04 15:35:18.996637', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dict/list', '200', '\"{}\"', '\"{\\\"dicts\\\":\\\"9\\\",\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (534, '2024-12-04 15:35:20.050766', '2024-12-04 15:35:20.050766', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dict/list', '200', '\"{}\"', '\"{\\\"dicts\\\":\\\"8\\\",\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (535, '2024-12-04 15:35:21.241914', '2024-12-04 15:35:21.241914', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dict/list', '200', '\"{}\"', '\"{\\\"dicts\\\":\\\"1\\\",\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (536, '2024-12-04 15:35:23.839346', '2024-12-04 15:35:23.839346', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/filetype', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (537, '2024-12-04 15:35:23.844037', '2024-12-04 15:35:23.844037', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/upload/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (538, '2024-12-04 15:35:27.208118', '2024-12-04 15:35:27.208118', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (539, '2024-12-04 15:35:30.472339', '2024-12-04 15:35:30.472339', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (540, '2024-12-04 15:35:30.785322', '2024-12-04 15:35:30.785322', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (541, '2024-12-04 15:35:30.790005', '2024-12-04 15:35:30.790005', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (542, '2024-12-04 15:35:30.797638', '2024-12-04 15:35:30.797638', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (543, '2024-12-04 15:35:34.068596', '2024-12-04 15:35:34.068596', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (544, '2024-12-04 15:35:34.073177', '2024-12-04 15:35:34.073177', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (545, '2024-12-04 15:35:34.083675', '2024-12-04 15:35:34.083675', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (546, '2024-12-04 15:35:36.226201', '2024-12-04 15:35:36.226201', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/paramsType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (547, '2024-12-04 15:35:36.541843', '2024-12-04 15:35:36.541843', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/paramsGroup', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (548, '2024-12-04 15:35:36.547439', '2024-12-04 15:35:36.547439', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/params/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (549, '2024-12-04 15:35:48.186871', '2024-12-04 15:35:48.186871', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (550, '2024-12-04 15:35:48.383983', '2024-12-04 15:35:48.383983', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (551, '2024-12-04 15:35:48.406232', '2024-12-04 15:35:48.406232', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (552, '2024-12-04 15:35:49.043087', '2024-12-04 15:35:49.043087', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/paramsType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (553, '2024-12-04 15:35:49.051202', '2024-12-04 15:35:49.051202', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/paramsGroup', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (554, '2024-12-04 15:35:49.075262', '2024-12-04 15:35:49.075262', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/params/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (555, '2024-12-04 15:44:25.231849', '2024-12-04 15:44:25.231849', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/params/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (556, '2024-12-04 15:48:03.173239', '2024-12-04 15:48:03.173239', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (557, '2024-12-04 15:48:03.383388', '2024-12-04 15:48:03.383388', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (558, '2024-12-04 15:48:03.461593', '2024-12-04 15:48:03.461593', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (559, '2024-12-04 15:48:03.723326', '2024-12-04 15:48:03.723326', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/paramsType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (560, '2024-12-04 15:48:03.730650', '2024-12-04 15:48:03.730650', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/paramsGroup', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (561, '2024-12-04 15:48:03.780314', '2024-12-04 15:48:03.780314', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/params/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (562, '2024-12-04 15:48:17.013337', '2024-12-04 15:48:17.013337', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/params/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (563, '2024-12-04 15:48:18.179513', '2024-12-04 15:48:18.179513', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/params/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (564, '2024-12-04 15:51:16.751090', '2024-12-04 15:51:16.751090', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (565, '2024-12-04 15:51:16.777032', '2024-12-04 15:51:16.777032', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (566, '2024-12-04 15:51:31.923826', '2024-12-04 15:51:31.923826', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (567, '2024-12-04 15:51:31.930544', '2024-12-04 15:51:31.930544', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (568, '2024-12-04 15:51:32.224448', '2024-12-04 15:51:32.224448', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (569, '2024-12-04 15:51:32.231149', '2024-12-04 15:51:32.231149', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (570, '2024-12-04 15:51:33.968541', '2024-12-04 15:51:33.968541', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/info/1', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (571, '2024-12-04 15:51:37.711489', '2024-12-04 15:51:37.711489', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/info/1', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (572, '2024-12-04 15:51:43.726538', '2024-12-04 15:51:43.726538', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'PATCH', '/roles/update', '200', '\"{\\\"id\\\":\\\"1\\\",\\\"createTime\\\":\\\"2024-04-30 10:58:03.088316\\\",\\\"updateTime\\\":\\\"2024-12-04 15:34:58.000000\\\",\\\"createBy\\\":null,\\\"updateBy\\\":\\\"1\\\",\\\"name\\\":\\\"管理员\\\",\\\"powerkey\\\":\\\"4\\\",\\\"deptArr\\\":[\\\"3\\\",\\\"4\\\"],\\\"bak\\\":\\\"11\\\",\\\"routers\\\":[\\\"23\\\",\\\"25\\\",\\\"26\\\",\\\"27\\\",\\\"28\\\",\\\"29\\\",\\\"30\\\",\\\"31\\\",\\\"32\\\",\\\"51\\\"]}\"', '\"{}\"');
INSERT INTO `logs` VALUES (573, '2024-12-04 15:51:44.288987', '2024-12-04 15:51:44.288987', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (574, '2024-12-04 15:51:47.811823', '2024-12-04 15:51:47.811823', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'POST', '/auth/loginOut', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (575, '2024-12-04 15:51:48.209636', '2024-12-04 15:51:48.209636', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/code', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (576, '2024-12-04 15:51:48.939284', '2024-12-04 15:51:48.939284', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'POST', '/auth/login', '200', '\"{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"123456\\\",\\\"code\\\":\\\"8888\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (577, '2024-12-04 15:51:49.259592', '2024-12-04 15:51:49.259592', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (578, '2024-12-04 15:51:49.527606', '2024-12-04 15:51:49.527606', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (579, '2024-12-04 15:51:49.652670', '2024-12-04 15:51:49.652670', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (580, '2024-12-04 15:51:53.048111', '2024-12-04 15:51:53.048111', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (581, '2024-12-04 15:51:53.053992', '2024-12-04 15:51:53.053992', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (582, '2024-12-04 15:52:04.959759', '2024-12-04 15:52:04.959759', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (583, '2024-12-04 15:52:04.964437', '2024-12-04 15:52:04.964437', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (584, '2024-12-04 15:52:05.294897', '2024-12-04 15:52:05.294897', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (585, '2024-12-04 15:52:07.342187', '2024-12-04 15:52:07.342187', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (586, '2024-12-04 15:52:07.348055', '2024-12-04 15:52:07.348055', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (587, '2024-12-04 15:52:07.355017', '2024-12-04 15:52:07.355017', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (588, '2024-12-04 15:52:07.360816', '2024-12-04 15:52:07.360816', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (589, '2024-12-04 15:52:22.823645', '2024-12-04 15:52:22.823645', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/info/1', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (590, '2024-12-04 15:52:31.264339', '2024-12-04 15:52:31.264339', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (591, '2024-12-04 15:52:36.910923', '2024-12-04 15:52:36.910923', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (592, '2024-12-04 15:52:36.915459', '2024-12-04 15:52:36.915459', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (593, '2024-12-04 15:52:36.920509', '2024-12-04 15:52:36.920509', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (594, '2024-12-04 15:52:38.969406', '2024-12-04 15:52:38.969406', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/info/1', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (595, '2024-12-04 15:52:49.296943', '2024-12-04 15:52:49.296943', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (596, '2024-12-04 15:52:49.301149', '2024-12-04 15:52:49.301149', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (597, '2024-12-04 15:52:49.611580', '2024-12-04 15:52:49.611580', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (598, '2024-12-04 15:52:53.715741', '2024-12-04 15:52:53.715741', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/info/1', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (599, '2024-12-04 15:53:10.610332', '2024-12-04 15:53:10.610332', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (600, '2024-12-04 15:53:10.614862', '2024-12-04 15:53:10.614862', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (601, '2024-12-04 15:53:24.549779', '2024-12-04 15:53:24.549779', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (602, '2024-12-04 15:53:24.790243', '2024-12-04 15:53:24.790243', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (603, '2024-12-04 15:53:24.802164', '2024-12-04 15:53:24.802164', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (604, '2024-12-04 15:53:25.170872', '2024-12-04 15:53:25.170872', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (605, '2024-12-04 15:53:25.184300', '2024-12-04 15:53:25.184300', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (606, '2024-12-04 15:53:53.514274', '2024-12-04 15:53:53.514274', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (607, '2024-12-04 15:53:53.520733', '2024-12-04 15:53:53.520733', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (608, '2024-12-04 15:53:53.525673', '2024-12-04 15:53:53.525673', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (609, '2024-12-04 15:53:55.504063', '2024-12-04 15:53:55.504063', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (610, '2024-12-04 15:53:56.541911', '2024-12-04 15:53:56.541911', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (611, '2024-12-04 15:53:57.135906', '2024-12-04 15:53:57.135906', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (612, '2024-12-04 15:54:06.918164', '2024-12-04 15:54:06.918164', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (613, '2024-12-04 15:54:06.922074', '2024-12-04 15:54:06.922074', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (614, '2024-12-04 15:54:10.877197', '2024-12-04 15:54:10.877197', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (615, '2024-12-04 15:54:11.184013', '2024-12-04 15:54:11.184013', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (616, '2024-12-04 15:54:11.188973', '2024-12-04 15:54:11.188973', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (617, '2024-12-04 15:54:11.201149', '2024-12-04 15:54:11.201149', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (618, '2024-12-04 15:54:12.410927', '2024-12-04 15:54:12.410927', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/info/1', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (619, '2024-12-04 15:54:17.566961', '2024-12-04 15:54:17.566961', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'PATCH', '/roles/update', '200', '\"{\\\"id\\\":\\\"1\\\",\\\"createTime\\\":\\\"2024-04-30 10:58:03.088316\\\",\\\"updateTime\\\":\\\"2024-12-04 15:51:43.000000\\\",\\\"createBy\\\":null,\\\"updateBy\\\":\\\"1\\\",\\\"name\\\":\\\"管理员\\\",\\\"powerkey\\\":\\\"3\\\",\\\"deptArr\\\":[\\\"3\\\",\\\"4\\\"],\\\"bak\\\":\\\"11\\\",\\\"routers\\\":[\\\"23\\\",\\\"25\\\",\\\"26\\\",\\\"27\\\",\\\"28\\\",\\\"29\\\",\\\"30\\\",\\\"31\\\",\\\"32\\\",\\\"51\\\"]}\"', '\"{}\"');
INSERT INTO `logs` VALUES (620, '2024-12-04 15:54:18.115237', '2024-12-04 15:54:18.115237', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (621, '2024-12-04 15:54:22.798262', '2024-12-04 15:54:22.798262', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'POST', '/auth/loginOut', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (622, '2024-12-04 15:54:23.346387', '2024-12-04 15:54:23.346387', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/code', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (623, '2024-12-04 15:54:24.137753', '2024-12-04 15:54:24.137753', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'POST', '/auth/login', '200', '\"{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"123456\\\",\\\"code\\\":\\\"8888\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (624, '2024-12-04 15:54:24.457927', '2024-12-04 15:54:24.457927', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (625, '2024-12-04 15:54:24.719699', '2024-12-04 15:54:24.719699', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (626, '2024-12-04 15:54:24.845461', '2024-12-04 15:54:24.845461', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (627, '2024-12-04 15:54:29.581090', '2024-12-04 15:54:29.581090', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (628, '2024-12-04 15:54:29.585247', '2024-12-04 15:54:29.585247', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (629, '2024-12-04 15:54:29.895565', '2024-12-04 15:54:29.895565', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (630, '2024-12-04 15:54:34.281679', '2024-12-04 15:54:34.281679', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (631, '2024-12-04 15:54:34.286619', '2024-12-04 15:54:34.286619', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (632, '2024-12-04 15:54:41.446641', '2024-12-04 15:54:41.446641', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (633, '2024-12-04 15:54:41.763588', '2024-12-04 15:54:41.763588', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (634, '2024-12-04 15:54:41.766998', '2024-12-04 15:54:41.766998', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (635, '2024-12-04 15:54:41.774395', '2024-12-04 15:54:41.774395', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (636, '2024-12-04 15:54:43.033614', '2024-12-04 15:54:43.033614', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/info/1', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (637, '2024-12-04 15:54:52.474513', '2024-12-04 15:54:52.474513', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'PATCH', '/roles/update', '200', '\"{\\\"id\\\":\\\"1\\\",\\\"createTime\\\":\\\"2024-04-30 10:58:03.088316\\\",\\\"updateTime\\\":\\\"2024-12-04 15:54:17.000000\\\",\\\"createBy\\\":null,\\\"updateBy\\\":\\\"1\\\",\\\"name\\\":\\\"管理员\\\",\\\"powerkey\\\":\\\"1\\\",\\\"deptArr\\\":[\\\"3\\\",\\\"4\\\"],\\\"bak\\\":\\\"11\\\",\\\"routers\\\":[\\\"23\\\",\\\"25\\\",\\\"26\\\",\\\"27\\\",\\\"28\\\",\\\"29\\\",\\\"30\\\",\\\"31\\\",\\\"32\\\",\\\"51\\\"]}\"', '\"{}\"');
INSERT INTO `logs` VALUES (638, '2024-12-04 15:54:53.335137', '2024-12-04 15:54:53.335137', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (639, '2024-12-04 15:54:55.634119', '2024-12-04 15:54:55.634119', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (640, '2024-12-04 15:54:55.945819', '2024-12-04 15:54:55.945819', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (641, '2024-12-04 15:55:01.596176', '2024-12-04 15:55:01.596176', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'POST', '/auth/loginOut', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (642, '2024-12-04 15:55:02.808854', '2024-12-04 15:55:02.808854', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'POST', '/auth/login', '200', '\"{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"123456\\\",\\\"code\\\":\\\"8888\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (643, '2024-12-04 15:55:03.137231', '2024-12-04 15:55:03.137231', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (644, '2024-12-04 15:55:03.401824', '2024-12-04 15:55:03.401824', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (645, '2024-12-04 15:55:03.524009', '2024-12-04 15:55:03.524009', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (646, '2024-12-04 15:55:06.637778', '2024-12-04 15:55:06.637778', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (647, '2024-12-04 15:55:06.951314', '2024-12-04 15:55:06.951314', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (648, '2024-12-04 15:55:10.685432', '2024-12-04 15:55:10.685432', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"2\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (649, '2024-12-04 16:03:09.444774', '2024-12-04 16:03:09.444774', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/routerType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (650, '2024-12-04 16:03:09.475876', '2024-12-04 16:03:09.475876', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (651, '2024-12-04 16:03:13.800017', '2024-12-04 16:03:13.800017', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (652, '2024-12-04 16:03:13.807210', '2024-12-04 16:03:13.807210', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (653, '2024-12-04 16:03:13.811987', '2024-12-04 16:03:13.811987', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (654, '2024-12-04 16:03:13.815955', '2024-12-04 16:03:13.815955', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (655, '2024-12-04 16:03:16.166092', '2024-12-04 16:03:16.166092', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (656, '2024-12-04 16:03:16.492225', '2024-12-04 16:03:16.492225', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (657, '2024-12-04 16:03:16.501929', '2024-12-04 16:03:16.501929', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (658, '2024-12-05 09:20:29.317770', '2024-12-05 09:20:29.317770', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/code', '200', '\"{}\"', '\"{\\\"0.5256364566427534\\\":\\\"\\\"}\"');
INSERT INTO `logs` VALUES (659, '2024-12-05 09:22:13.721984', '2024-12-05 09:22:13.721984', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/code', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (660, '2024-12-05 09:22:23.993500', '2024-12-05 09:22:23.993500', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/code', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (661, '2024-12-05 09:22:43.275338', '2024-12-05 09:22:43.275338', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/code', '200', '\"{}\"', '\"{\\\"0.15260953980810754\\\":\\\"\\\"}\"');
INSERT INTO `logs` VALUES (662, '2024-12-05 09:43:47.700483', '2024-12-05 09:43:47.700483', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'POST', '/auth/login', '200', '\"{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"123456\\\",\\\"code\\\":\\\"8888\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (663, '2024-12-05 09:43:47.858250', '2024-12-05 09:43:47.858250', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (664, '2024-12-05 09:43:48.112587', '2024-12-05 09:43:48.112587', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (665, '2024-12-05 09:43:48.414683', '2024-12-05 09:43:48.414683', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (666, '2024-12-05 09:43:52.204734', '2024-12-05 09:43:52.204734', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/routerType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (667, '2024-12-05 09:43:52.209409', '2024-12-05 09:43:52.209409', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (668, '2024-12-05 09:43:57.689011', '2024-12-05 09:43:57.689011', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (669, '2024-12-05 09:43:57.697984', '2024-12-05 09:43:57.697984', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (670, '2024-12-05 09:43:57.992591', '2024-12-05 09:43:57.992591', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (671, '2024-12-05 09:43:58.000693', '2024-12-05 09:43:58.000693', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (672, '2024-12-05 09:43:59.874119', '2024-12-05 09:43:59.874119', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (673, '2024-12-05 09:43:59.880751', '2024-12-05 09:43:59.880751', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (674, '2024-12-05 09:44:03.212038', '2024-12-05 09:44:03.212038', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (675, '2024-12-05 09:44:03.217194', '2024-12-05 09:44:03.217194', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (676, '2024-12-05 09:44:03.523686', '2024-12-05 09:44:03.523686', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (677, '2024-12-05 09:44:05.018114', '2024-12-05 09:44:05.018114', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (678, '2024-12-05 09:44:05.023316', '2024-12-05 09:44:05.023316', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (679, '2024-12-05 09:44:05.033473', '2024-12-05 09:44:05.033473', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (680, '2024-12-05 09:44:05.931276', '2024-12-05 09:44:05.931276', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/info/1', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (681, '2024-12-05 09:44:40.400441', '2024-12-05 09:44:40.400441', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/info/3', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (682, '2024-12-05 09:47:21.760953', '2024-12-05 09:47:21.760953', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (683, '2024-12-05 09:47:22.106556', '2024-12-05 09:47:22.106556', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (684, '2024-12-05 09:47:22.113459', '2024-12-05 09:47:22.113459', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (685, '2024-12-05 09:47:22.538673', '2024-12-05 09:47:22.538673', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (686, '2024-12-05 09:47:22.544268', '2024-12-05 09:47:22.544268', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (687, '2024-12-05 09:47:22.548613', '2024-12-05 09:47:22.548613', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (688, '2024-12-05 09:47:22.690852', '2024-12-05 09:47:22.690852', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (689, '2024-12-05 09:48:01.292925', '2024-12-05 09:48:01.292925', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (690, '2024-12-05 09:48:01.653445', '2024-12-05 09:48:01.653445', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (691, '2024-12-05 09:48:01.660919', '2024-12-05 09:48:01.660919', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (692, '2024-12-05 09:48:01.983957', '2024-12-05 09:48:01.983957', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (693, '2024-12-05 09:48:01.991649', '2024-12-05 09:48:01.991649', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (694, '2024-12-05 09:48:02.014538', '2024-12-05 09:48:02.014538', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (695, '2024-12-05 09:48:02.147138', '2024-12-05 09:48:02.147138', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (696, '2024-12-05 09:48:04.777356', '2024-12-05 09:48:04.777356', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (697, '2024-12-05 09:48:05.008729', '2024-12-05 09:48:05.008729', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (698, '2024-12-05 09:48:05.015920', '2024-12-05 09:48:05.015920', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (699, '2024-12-05 09:48:05.576288', '2024-12-05 09:48:05.576288', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (700, '2024-12-05 09:48:05.582907', '2024-12-05 09:48:05.582907', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (701, '2024-12-05 09:48:05.591587', '2024-12-05 09:48:05.591587', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (702, '2024-12-05 09:48:05.661957', '2024-12-05 09:48:05.661957', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (703, '2024-12-05 09:48:38.057123', '2024-12-05 09:48:38.057123', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (704, '2024-12-05 09:48:38.397960', '2024-12-05 09:48:38.397960', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (705, '2024-12-05 09:48:38.403722', '2024-12-05 09:48:38.403722', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (706, '2024-12-05 09:48:38.816868', '2024-12-05 09:48:38.816868', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (707, '2024-12-05 09:48:38.821877', '2024-12-05 09:48:38.821877', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (708, '2024-12-05 09:48:38.828281', '2024-12-05 09:48:38.828281', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (709, '2024-12-05 09:48:39.119327', '2024-12-05 09:48:39.119327', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (710, '2024-12-05 10:02:10.357885', '2024-12-05 10:02:10.357885', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/auth/userInfo', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (711, '2024-12-05 10:02:10.547649', '2024-12-05 10:02:10.547649', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/gender', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (712, '2024-12-05 10:02:10.577768', '2024-12-05 10:02:10.577768', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/status', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (713, '2024-12-05 10:02:10.995401', '2024-12-05 10:02:10.995401', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/powerkey', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (714, '2024-12-05 10:02:11.007254', '2024-12-05 10:02:11.007254', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (715, '2024-12-05 10:02:11.053749', '2024-12-05 10:02:11.053749', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/router/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (716, '2024-12-05 10:02:11.061745', '2024-12-05 10:02:11.061745', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (717, '2024-12-05 10:02:12.425809', '2024-12-05 10:02:12.425809', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (718, '2024-12-05 10:02:12.432893', '2024-12-05 10:02:12.432893', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/xxx/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (719, '2024-12-05 10:04:48.292146', '2024-12-05 10:04:48.292146', NULL, NULL, NULL, NULL, '::1', 'GET', '', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (720, '2024-12-05 10:04:48.924136', '2024-12-05 10:04:48.924136', NULL, NULL, NULL, NULL, '::1', 'GET', '/favicon.ico', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (721, '2024-12-05 10:04:52.285803', '2024-12-05 10:04:52.285803', NULL, NULL, NULL, NULL, '::1', 'GET', '/upload', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (722, '2024-12-05 10:05:50.667555', '2024-12-05 10:05:50.667555', NULL, NULL, NULL, NULL, '::1', 'GET', '/upload', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (723, '2024-12-05 10:05:55.911323', '2024-12-05 10:05:55.911323', NULL, NULL, NULL, NULL, '::1', 'POST', '/auth/login', '200', '\"{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"123456\\\",\\\"code\\\":\\\"8888\\\"}\"', '\"{}\"');
INSERT INTO `logs` VALUES (724, '2024-12-05 10:05:58.296884', '2024-12-05 10:05:58.296884', NULL, NULL, NULL, NULL, '::1', 'GET', '/upload', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (725, '2024-12-05 10:13:19.651416', '2024-12-05 10:13:19.651416', NULL, NULL, NULL, NULL, '::1', 'POST', '/upload', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (726, '2024-12-05 10:41:12.021241', '2024-12-05 10:41:12.021241', NULL, NULL, NULL, NULL, '::1', 'GET', '', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (727, '2024-12-05 10:41:26.730278', '2024-12-05 10:41:26.730278', NULL, NULL, NULL, NULL, '::1', 'GET', '/template', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (728, '2024-12-05 10:47:29.684733', '2024-12-05 10:47:29.684733', NULL, NULL, NULL, NULL, '::1', 'GET', '', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (729, '2024-12-05 10:47:30.220323', '2024-12-05 10:47:30.220323', NULL, NULL, NULL, NULL, '::1', 'GET', '/favicon.ico', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (730, '2024-12-05 10:56:06.297750', '2024-12-05 10:56:06.297750', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/paramsType', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (731, '2024-12-05 10:56:06.379988', '2024-12-05 10:56:06.379988', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dicts/key/paramsGroup', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (732, '2024-12-05 10:56:09.773964', '2024-12-05 10:56:09.773964', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/roles/all', '200', '\"{}\"', '\"{}\"');
INSERT INTO `logs` VALUES (733, '2024-12-05 10:56:09.782860', '2024-12-05 10:56:09.782860', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/users/list', '200', '\"{}\"', '\"{\\\"page\\\":\\\"1\\\",\\\"size\\\":\\\"10\\\"}\"');
INSERT INTO `logs` VALUES (734, '2024-12-05 10:56:10.077147', '2024-12-05 10:56:10.077147', NULL, NULL, NULL, NULL, '::ffff:127.0.0.1', 'GET', '/dept/tree', '200', '\"{}\"', '\"{}\"');

-- ----------------------------
-- Table structure for params
-- ----------------------------
DROP TABLE IF EXISTS `params`;
CREATE TABLE `params`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '参数key',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '参数value',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '类型',
  `group` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '所属分组',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_cec2fbee094671be15e2bb74bc`(`key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of params
-- ----------------------------
INSERT INTO `params` VALUES (1, '2024-05-13 14:41:50.121202', '2024-12-04 15:48:32.561051', NULL, '1', NULL, '1', '3', '1', '1');
INSERT INTO `params` VALUES (3, '2024-05-13 16:50:34.088910', '2024-12-04 15:48:15.489639', NULL, '1', NULL, '2', '2', '1', '2');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `powerkey` enum('1','2','3','4','5') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '5' COMMENT '权限标识(1:全部数据,2:自定义数据,3:本级及子级,4:本级,5:本人数据)',
  `deptArr` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '自定义数据:部门id数组',
  `bak` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `deptId` bigint(0) NULL DEFAULT NULL COMMENT '权限id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '2024-04-30 10:58:03.088316', '2024-12-04 15:54:52.000000', NULL, NULL, '1', '管理员', '1', '3,4', '11', NULL);
INSERT INTO `role` VALUES (3, '2024-05-06 11:28:12.065465', '2024-06-07 10:01:35.437461', NULL, NULL, NULL, '普通用户', '3', '2,3', NULL, NULL);

-- ----------------------------
-- Table structure for role_routers_router
-- ----------------------------
DROP TABLE IF EXISTS `role_routers_router`;
CREATE TABLE `role_routers_router`  (
  `roleId` bigint(0) NOT NULL,
  `routerId` bigint(0) NOT NULL,
  PRIMARY KEY (`roleId`, `routerId`) USING BTREE,
  INDEX `IDX_fdbb2d7ff5f4c34bb67865652e`(`roleId`) USING BTREE,
  INDEX `IDX_a308e2e2d1631d834918529eb5`(`routerId`) USING BTREE,
  CONSTRAINT `FK_a308e2e2d1631d834918529eb59` FOREIGN KEY (`routerId`) REFERENCES `router` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_fdbb2d7ff5f4c34bb67865652eb` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_routers_router
-- ----------------------------
INSERT INTO `role_routers_router` VALUES (1, 23);
INSERT INTO `role_routers_router` VALUES (1, 25);
INSERT INTO `role_routers_router` VALUES (1, 26);
INSERT INTO `role_routers_router` VALUES (1, 27);
INSERT INTO `role_routers_router` VALUES (1, 28);
INSERT INTO `role_routers_router` VALUES (1, 29);
INSERT INTO `role_routers_router` VALUES (1, 30);
INSERT INTO `role_routers_router` VALUES (1, 31);
INSERT INTO `role_routers_router` VALUES (1, 32);
INSERT INTO `role_routers_router` VALUES (1, 51);
INSERT INTO `role_routers_router` VALUES (3, 23);
INSERT INTO `role_routers_router` VALUES (3, 24);
INSERT INTO `role_routers_router` VALUES (3, 26);
INSERT INTO `role_routers_router` VALUES (3, 30);
INSERT INTO `role_routers_router` VALUES (3, 31);

-- ----------------------------
-- Table structure for router
-- ----------------------------
DROP TABLE IF EXISTS `router`;
CREATE TABLE `router`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '路径标识',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1' COMMENT '类型{1:菜单,2:按钮}',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图标',
  `parentId` bigint(0) NULL DEFAULT NULL COMMENT '父级',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '組件地址',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `meta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '路由元信息',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_ba11076437daf5640ddc870918`(`path`) USING BTREE,
  UNIQUE INDEX `IDX_f7c85e94b73d224c4168efb7eb`(`name`) USING BTREE,
  INDEX `FK_6450042065e170b9f556d8a89f1`(`parentId`) USING BTREE,
  CONSTRAINT `FK_6450042065e170b9f556d8a89f1` FOREIGN KEY (`parentId`) REFERENCES `router` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of router
-- ----------------------------
INSERT INTO `router` VALUES (23, '2024-05-23 16:55:08.723830', '2024-11-26 15:52:04.000000', NULL, NULL, '1', '/dataScreen', '1', NULL, NULL, '/src/views/dataSceen/index.vue', 'dataScreen', '{\"title\":\"大屏\",\"fullScreen\":\"true\"}');
INSERT INTO `router` VALUES (24, '2024-05-27 10:42:30.709191', '2024-05-28 17:30:48.293720', NULL, NULL, NULL, '/admin', '1', NULL, NULL, NULL, 'admin', '{\"title\":\"系统管理\"}');
INSERT INTO `router` VALUES (25, '2024-05-27 10:43:23.334894', '2024-05-28 17:31:00.260762', NULL, NULL, NULL, '/admin/routers', '1', NULL, 24, '/src/views/base/routers/index.vue', 'routers', '{\"title\": \"菜单管理\"}');
INSERT INTO `router` VALUES (26, '2024-05-27 10:49:13.875583', '2024-05-28 17:31:02.763897', NULL, NULL, NULL, '/admin/dicts', '1', NULL, 24, '/src/views/base/dicts/index.vue', 'dicts', '{\"title\":\"字典管理\"}');
INSERT INTO `router` VALUES (27, '2024-05-27 17:58:57.270489', '2024-05-28 17:31:05.042361', NULL, NULL, NULL, '/admin/files', '1', NULL, 24, '/src/views/base/files/index.vue', 'files', '{\"title\":\"文件管理\"}');
INSERT INTO `router` VALUES (28, '2024-05-27 17:59:21.299502', '2024-05-28 17:31:07.587463', NULL, NULL, NULL, '/admin/depts', '1', NULL, 24, '/src/views/base/depts/index.vue', 'depts', '{\"title\":\"部门管理\"}');
INSERT INTO `router` VALUES (29, '2024-05-27 18:03:35.648761', '2024-05-28 17:31:09.587116', NULL, NULL, NULL, '/admin/roles', '1', NULL, 24, '/src/views/base/roles/index.vue', 'roles', '{\"title\":\"角色管理\"}');
INSERT INTO `router` VALUES (30, '2024-05-27 18:05:53.877542', '2024-05-28 17:31:11.510785', NULL, NULL, NULL, '/admin/users', '1', NULL, 24, '/src/views/base/users/index.vue', 'users', '{\"title\":\"用户管理\"}');
INSERT INTO `router` VALUES (31, '2024-05-27 18:06:08.921275', '2024-05-28 17:31:13.646125', NULL, NULL, NULL, '/admin/params', '1', NULL, 24, '/src/views/base/params/index.vue', 'params', '{\"title\":\"参数管理\"}');
INSERT INTO `router` VALUES (32, '2024-08-02 10:23:42.359525', '2024-11-26 17:23:03.000000', NULL, NULL, '1', '/ceshi', '1', NULL, NULL, '/src/views/main/index.vue', '/ceshi', '{\"title\":\"测试\"}');
INSERT INTO `router` VALUES (51, '2024-12-02 10:41:22.668328', '2024-12-02 10:41:22.668328', NULL, '1', NULL, '/admin/logs', '1', NULL, 24, '/src/views/base/logs/index.vue', 'logs', '{\"title\":\"日志管理\"}');

-- ----------------------------
-- Table structure for router_closure
-- ----------------------------
DROP TABLE IF EXISTS `router_closure`;
CREATE TABLE `router_closure`  (
  `id_ancestor` bigint(0) NOT NULL,
  `id_descendant` bigint(0) NOT NULL,
  PRIMARY KEY (`id_ancestor`, `id_descendant`) USING BTREE,
  INDEX `IDX_cb1f5d4dc634006728263dfc71`(`id_ancestor`) USING BTREE,
  INDEX `IDX_b17edb0a8401d695f0288777b3`(`id_descendant`) USING BTREE,
  CONSTRAINT `FK_b17edb0a8401d695f0288777b3f` FOREIGN KEY (`id_descendant`) REFERENCES `router` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_cb1f5d4dc634006728263dfc71b` FOREIGN KEY (`id_ancestor`) REFERENCES `router` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of router_closure
-- ----------------------------
INSERT INTO `router_closure` VALUES (23, 23);
INSERT INTO `router_closure` VALUES (24, 24);
INSERT INTO `router_closure` VALUES (24, 25);
INSERT INTO `router_closure` VALUES (24, 26);
INSERT INTO `router_closure` VALUES (24, 27);
INSERT INTO `router_closure` VALUES (24, 28);
INSERT INTO `router_closure` VALUES (24, 29);
INSERT INTO `router_closure` VALUES (24, 30);
INSERT INTO `router_closure` VALUES (24, 31);
INSERT INTO `router_closure` VALUES (24, 51);
INSERT INTO `router_closure` VALUES (25, 25);
INSERT INTO `router_closure` VALUES (26, 26);
INSERT INTO `router_closure` VALUES (27, 27);
INSERT INTO `router_closure` VALUES (28, 28);
INSERT INTO `router_closure` VALUES (29, 29);
INSERT INTO `router_closure` VALUES (30, 30);
INSERT INTO `router_closure` VALUES (31, 31);
INSERT INTO `router_closure` VALUES (32, 32);
INSERT INTO `router_closure` VALUES (51, 51);

-- ----------------------------
-- Table structure for tokens
-- ----------------------------
DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `deptId` bigint(0) NULL DEFAULT NULL COMMENT '权限id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tokens
-- ----------------------------

-- ----------------------------
-- Table structure for uploads
-- ----------------------------
DROP TABLE IF EXISTS `uploads`;
CREATE TABLE `uploads`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of uploads
-- ----------------------------
INSERT INTO `uploads` VALUES (1, '2024-05-10 09:11:44.662268', '2024-11-26 10:13:21.000000', '2024-11-26 10:13:21.000000', NULL, NULL, '自考本.docx', '30722', '1715303504631.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'uploads\\1715303504631.docx');
INSERT INTO `uploads` VALUES (2, '2024-05-10 09:11:44.679940', '2024-11-26 10:13:18.000000', '2024-11-26 10:13:18.000000', NULL, NULL, 'favicon.ico', '4286', '1715303504633.ico', 'image/vnd.microsoft.icon', 'uploads\\1715303504633.ico');
INSERT INTO `uploads` VALUES (3, '2024-05-10 09:11:44.685409', '2024-11-26 10:13:14.000000', '2024-11-26 10:13:14.000000', NULL, NULL, '文龙24年5月绩效模板.xlsx', '12143', '1715303504633.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'uploads\\1715303504633.xlsx');
INSERT INTO `uploads` VALUES (11, '2024-05-11 08:45:35.322142', '2024-11-26 10:13:16.000000', '2024-11-26 10:13:16.000000', '1', '1', '404.jpg', '59849', '1715388335272.jpg', 'image/jpeg', 'uploads\\1715388335272.jpg');
INSERT INTO `uploads` VALUES (25, '2024-08-22 10:37:40.493626', '2024-11-26 10:13:19.000000', '2024-11-26 10:13:19.000000', '1', NULL, 'h264.mp4', '11250530', '1724294260357.mp4', 'video/mp4', 'uploads\\1724294260357.mp4');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `deptId` bigint(0) NULL DEFAULT NULL COMMENT '权限id',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性别',
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话',
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `status` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '账号状态',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed`(`username`) USING BTREE,
  INDEX `FK_b79e66a3f148e12f9eb5dafb3c0`(`deptId`) USING BTREE,
  CONSTRAINT `FK_b79e66a3f148e12f9eb5dafb3c0` FOREIGN KEY (`deptId`) REFERENCES `dept` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '2024-05-07 09:22:54.327488', '2024-12-04 15:53:48.518818', NULL, '1', NULL, 1, 'admin', '123456', '1', NULL, NULL, '1', NULL);
INSERT INTO `user` VALUES (42, '2024-05-08 17:51:28.236737', '2024-06-12 15:37:44.763496', NULL, '1', NULL, 2, 'user', '123456', NULL, NULL, NULL, '1', NULL);

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role`  (
  `userId` bigint(0) NOT NULL,
  `roleId` bigint(0) NOT NULL,
  PRIMARY KEY (`userId`, `roleId`) USING BTREE,
  INDEX `IDX_5f9286e6c25594c6b88c108db7`(`userId`) USING BTREE,
  INDEX `IDX_4be2f7adf862634f5f803d246b`(`roleId`) USING BTREE,
  CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO `user_roles_role` VALUES (1, 1);
INSERT INTO `user_roles_role` VALUES (42, 3);

-- ----------------------------
-- Table structure for xxx
-- ----------------------------
DROP TABLE IF EXISTS `xxx`;
CREATE TABLE `xxx`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `deptId` bigint(0) NULL DEFAULT NULL COMMENT '权限id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '数据库注释',
  `ceshi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数据库注释',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xxx
-- ----------------------------
INSERT INTO `xxx` VALUES (1, '2024-04-12 14:37:04.000000', '2024-12-04 15:53:22.335579', NULL, NULL, NULL, 1, '5', '1');
INSERT INTO `xxx` VALUES (2, '2024-04-23 16:16:21.000000', '2024-12-04 15:53:22.339088', NULL, NULL, NULL, 2, 'update', '1');
INSERT INTO `xxx` VALUES (3, '2024-04-23 16:19:26.000000', '2024-12-04 15:53:22.343457', NULL, NULL, '1', 3, '574634', '1');
INSERT INTO `xxx` VALUES (4, '2024-04-23 16:19:46.000000', '2024-12-04 15:53:22.346832', NULL, NULL, NULL, 4, '111111111111', '0');
INSERT INTO `xxx` VALUES (5, '2024-04-23 16:21:47.000000', '2024-12-04 15:53:22.349956', NULL, NULL, NULL, 1, '22222222', '0');
INSERT INTO `xxx` VALUES (6, '2024-04-23 16:30:39.000000', '2024-12-04 15:53:22.352708', NULL, NULL, NULL, 2, '2783', '0');
INSERT INTO `xxx` VALUES (7, '2024-04-23 16:30:43.000000', '2024-12-04 15:53:22.356058', NULL, NULL, NULL, 3, '11111111', '0');
INSERT INTO `xxx` VALUES (8, '2024-04-23 16:34:44.000000', '2024-12-04 15:53:22.358991', NULL, NULL, NULL, 4, '3333333333333333', '0');
INSERT INTO `xxx` VALUES (9, '2024-04-24 09:30:31.000000', '2024-12-04 15:53:22.361890', NULL, NULL, NULL, 1, '543', '1');
INSERT INTO `xxx` VALUES (10, '2024-07-23 11:14:56.000000', '2024-12-04 15:53:22.364325', NULL, NULL, '1', 11, '1111111111111', NULL);
INSERT INTO `xxx` VALUES (11, '2024-11-27 08:42:25.000000', '2024-12-04 15:53:22.366951', NULL, '1', NULL, 11, '11', '1');
INSERT INTO `xxx` VALUES (12, '2024-11-27 08:53:40.000000', '2024-12-04 15:53:22.369449', NULL, '1', NULL, 1, '44', '1');
INSERT INTO `xxx` VALUES (13, '2024-11-27 08:53:52.000000', '2024-12-04 15:53:22.372463', NULL, '1', '1', 3, '222', '1');
INSERT INTO `xxx` VALUES (14, '2024-12-04 14:57:03.843926', '2024-12-04 14:57:03.843926', NULL, '1', NULL, 1, '11', '1');

SET FOREIGN_KEY_CHECKS = 1;
