import { Router, Request, Response, NextFunction } from "express";

import { AppDataSource } from "../dbConfig";
import { Store } from "../models/Store";
import { City } from "../models/City";
import { State } from "../models/State";
import { Country } from "../models/Country";
import { Address } from "../models/Address";
import { Feature } from "../models/Feature";
import { StoreFeature } from "../models/StoreFeature";
import { ResponseStoreDTO } from "../dto/ResStoreDTO";
import { ResponseFeatureDTO } from "../dto/ResFeatureDTO";

export class StoreService {
  public static storeRepository = AppDataSource.getRepository(Store);
  public static addressRepository = AppDataSource.getRepository(Address);
  public static cityRepository = AppDataSource.getRepository(City);
  public static stateRepository = AppDataSource.getRepository(State);
  public static countryRepository = AppDataSource.getRepository(Country);
  public static featureRepository = AppDataSource.getRepository(Feature);
  public static storeFeatureRepository = AppDataSource.getRepository(StoreFeature);

  public static MapperResponseFeatureDTO(feature: Feature) {
    var ResponseFeatureDTO: ResponseFeatureDTO = {
      id: feature.Id,
      userId: feature.UserId,
      name: feature.Name,
      description: feature.Description,
    };
    return ResponseFeatureDTO;
  }

  public static MapperResponseAddressDTO(address: Address) {
    var ResponseAddressDTO = {
      id: address.Id,
      addressLine1: address.AddressLine1,
      addressLine2: address.AddressLine2,
      postalCode: address.PostalCode,
      locationLink: address.LocationLink,
    };
    return ResponseAddressDTO;
  }

  public static MapperResponseLocationDTO(loc: City | State | Country) {
    var ResponseLocationDTO = {
      id: loc.Id,
      name: loc.Name,
    };
    return ResponseLocationDTO;
  }

  public static async GetStoresByUserId(req: Request) {
    try {
      var userId = req.query.userId;
      var tempStoreList = await this.storeRepository.find({
        where: {
          UserId: userId,
          IsActive: true,
        },
      });

      const stores = [];
      for (const element of tempStoreList) {
        var tempAddress = await this.addressRepository.findOne({
          where: {
            Id: element.AddressId,
          },
        });
        var tempCity = await this.cityRepository.findOne({
          where: {
            Id: tempAddress.CityId,
          },
        });
        var tempState = await this.stateRepository.findOne({
          where: {
            Id: tempAddress.StateId,
          },
        });
        var tempCountry = await this.countryRepository.findOne({
          where: {
            Id: tempAddress.CountryId,
          },
        });

        var ResAddressDTO = this.MapperResponseAddressDTO(tempAddress);
        var ResCityDTO = this.MapperResponseLocationDTO(tempCity);
        var ResStateDTO = this.MapperResponseLocationDTO(tempState);
        var ResCountryDTO = this.MapperResponseLocationDTO(tempCountry);

        var tempStoreFeatures = await this.storeFeatureRepository.find({
          where: {
            StoreId: element.Id,
          }
        })

        var featureList = [];
        for(const storefeature of tempStoreFeatures) {
          
          var tempFeature = await this.featureRepository.findOne({
            where: {
              Id: storefeature.FeatureId
            }
          })
          featureList.push(this.MapperResponseFeatureDTO(tempFeature));
        }

        var ResStoreDTO: ResponseStoreDTO = {
          id: element.Id,
          userId: element.UserId,
          name: element.Name,
          address: ResAddressDTO,
          features: featureList,
          city: ResCityDTO,
          country: ResCountryDTO,
          state: ResStateDTO,
        };

        stores.push(ResStoreDTO);
      }
      return stores;
    } catch (error) {
      return error;
    }
  }

  public static async GetStoreByStoreId(id: number) {
    try {
      let store: ResponseStoreDTO = new ResponseStoreDTO();
      var tempStore = await this.storeRepository.findOne({
        where: {
          Id: id,
          IsActive: true,
        },
      });

      store.id = tempStore.Id;
      store.name = tempStore.Name;
      store.userId = tempStore.UserId;

      return store;
    } catch (error) {
      return error;
    }
  }

  public static async Location() {
    var cities = await this.cityRepository.find();
    var states = await this.stateRepository.find();
    var countries = await this.countryRepository.find();

    return { cities, states, countries };
  }
}
