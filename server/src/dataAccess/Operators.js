import { Sequelize } from "sequelize";

const LikeOp = Sequelize.Op.like;
const isOperator = Sequelize.Op.isOp

export default isOperator;