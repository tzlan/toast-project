import { Injectable } from "@nestjs/common";
import { Toast } from "./entities/toast.entity";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/entities/user.entity";

@Injectable()
export class ToastsService {

  constructor(
    @InjectModel(Toast)
    private toastModel: typeof Toast
  ) {}

  async findAll(): Promise<Toast[]> {
    return this.toastModel.findAll({
      include: [{ model: User, as: 'user' }],
    });
  }

  async findOneToast(id: string): Promise<Toast | null> {
    return this.toastModel.findByPk(id, {
      include: [{ model: User, as: 'user' }],
    });
  }
}
