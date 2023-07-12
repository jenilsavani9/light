import { Router, Request, Response, NextFunction } from "express";

import { AppDataSource } from "../dbConfig";
import { Feature } from "../models/Feature";
import { ResponseFeatureDTO } from "../dto/ResFeatureDTO";
import { StoreFeature } from "../models/StoreFeature";

export class FeatureService {
  public static featureRepository = AppDataSource.getRepository(Feature);
  public static storeFeatureRepository =
    AppDataSource.getRepository(StoreFeature);

  public static MapperResponseFeatureDTO(feature: Feature) {
    var ResponseFeatureDTO: ResponseFeatureDTO = {
      id: feature.Id,
      userId: feature.UserId,
      name: feature.Name,
      description: feature.Description,
    };
    return ResponseFeatureDTO;
  }

  public static async GetFeaturesByUserId(req: Request) {
    try {
      var UserId = req.query.UserId;
      var featureList = await this.featureRepository.find({
        where: {
          UserId: UserId,
          IsActive: true,
        },
      });

      var ResList = [];
      featureList.forEach((element) => {
        ResList.push(this.MapperResponseFeatureDTO(element));
      });

      return ResList;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public static async AddFeatures(req: Request) {
    try {
      var userId = req.body.userId;
      var name = req.body.name;
      var description = req.body.description;

      const tempFeature = this.featureRepository.create({
        UserId: userId,
        Name: name,
        Description: description,
        IsActive: true,
        CreatedAt: new Date(),
      });
      await this.featureRepository.save(tempFeature);

      return this.MapperResponseFeatureDTO(tempFeature);
    } catch (error) {
      return error;
    }
  }

  public static async GetFeaturesById(req: Request) {
    try {
      var FeatureId = req.params.featureId;

      const tempFeature = await this.featureRepository.findOne({
        where: {
          Id: FeatureId,
        },
      });

      return tempFeature;
    } catch (error) {
      return error;
    }
  }

  public static async UpdateFeatures(req: Request) {
    try {
      var Id = req.params.id;
      var Name = req.body.name;
      var Description = req.body.description;

      const tempFeature = await this.featureRepository.findOne({
        where: {
          Id: Id,
        },
      });

      tempFeature.Name = Name;
      tempFeature.Description = Description;
      tempFeature.UpdatedAt = new Date();

      this.featureRepository.save(tempFeature);

      return this.MapperResponseFeatureDTO(tempFeature);
    } catch (error) {
      return error;
    }
  }

  public static async DeleteFeatures(req: Request) {
    try {
      var Id = req.params.id;

      const tempFeature = await this.featureRepository.findOne({
        where: {
          Id: Id,
        },
      });

      tempFeature.UpdatedAt = new Date();
      tempFeature.IsActive = false;

      this.featureRepository.save(tempFeature);

      const storeFeatureList = await this.storeFeatureRepository.find({
        where: {
          FeatureId: Id,
        },
      });
      for (var deleteStoreFeature of storeFeatureList) {
        this.storeFeatureRepository.remove(deleteStoreFeature);
      }

      return this.MapperResponseFeatureDTO(tempFeature);
    } catch (error) {
      return error;
    }
  }

  public static async AddStoreFeatures(req: Request) {
    try {
      var storeId = req.body.StoreId;
      var featureIds = req.body.featureIds;
      await this.storeFeatureRepository
        .createQueryBuilder("StoreFeatures")
        .delete()
        .from(StoreFeature)
        .where("StoreId = :id", { id: storeId })
        .execute();

      for (const featureId of featureIds) {
        var newStoreFeature = this.storeFeatureRepository.create({
          FeatureId: featureId,
          StoreId: storeId,
          Status: true,
        });
        await this.storeFeatureRepository.save(newStoreFeature);
      }

      var newStoreFeatures = await this.storeFeatureRepository.find({
        where: {
          StoreId: storeId,
          Status: true,
        },
      });

      var resList = [];
      for (const feature of newStoreFeatures) {
        var oneFeature = await this.featureRepository.findOne({
          where: {
            Id: feature.FeatureId,
          },
        });
        resList.push(this.MapperResponseFeatureDTO(oneFeature));
      }
      return resList;
    } catch (error) {
      return error;
    }
  }
}
