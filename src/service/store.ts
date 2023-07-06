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
        var ResStoreDTO = await this.GetStoreByStoreId(element.Id);

        stores.push(ResStoreDTO);
      }
      return stores;
    } catch (error) {
      return error;
    }
  }

  public static async GetStoreByStoreId(id: number) {
    try {
      var element = await this.storeRepository.findOne({
        where: {
          Id: id,
        },
      });

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
        },
      });

      var featureList = [];
      for (const storefeature of tempStoreFeatures) {
        var tempFeature = await this.featureRepository.findOne({
          where: {
            Id: storefeature.FeatureId,
          },
        });
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

      return ResStoreDTO;
    } catch (error) {
      return error;
    }
  }

  public static async AddStore(req: Request) {
    try {
      var userId = req.body.userId;
      var name = req.body.name;
      var addressLine1 = req.body.addressLine1;
      var addressLine2 = req.body.addressLine2;
      var countryId = req.body.countryId;
      var stateId = req.body.stateId;
      var cityId = req.body.cityId;
      var postalCode = req.body.postalCode;
      var locationLink = req.body.locationLink;

      var newAddress = await this.addressRepository.create({
        AddressLine1: addressLine1,
        AddressLine2: addressLine2,
        CountryId: countryId,
        StateId: stateId,
        CityId: cityId,
        PostalCode: postalCode,
        LocationLink: locationLink,
        CreatedAt: new Date(),
      });
      await this.addressRepository.save(newAddress);

      var newStore = await this.storeRepository.create({
        UserId: userId,
        AddressId: newAddress.Id,
        Name: name,
        IsActive: true,
        CreatedAt: new Date(),
      });
      await this.storeRepository.save(newStore);

      return this.GetStoreByStoreId(newStore.Id);
    } catch (error) {
      return error;
    }
  }

  public static async EditStore(req: Request) {
    try {
      var id = req.params.id;
      var name = req.body.name;
      var addressLine1 = req.body.addressLine1;
      var addressLine2 = req.body.addressLine2;
      var postalCode = req.body.postalCode;
      var locationLink = req.body.locationLink;

      var store = await this.storeRepository.findOne({
        where: {
          Id: id,
        },
      });

      var address = await this.addressRepository.findOne({
        where: {
          Id: store.AddressId,
        },
      });

      address.AddressLine1 = addressLine1;
      address.AddressLine2 = addressLine2;
      address.PostalCode = postalCode;
      address.LocationLink = locationLink;
      await this.addressRepository.save(address);

      store.Name = name;
      store.UpdatedAt = new Date();
      await this.storeRepository.save(store);

      return this.GetStoreByStoreId(store.Id);
    } catch (error) {
      return error;
    }
  }

  public static async DeleteStore(req: Request) {
    try {
      var store = await this.storeRepository.findOne({
        where: {
          Id: req.params.id,
        },
      });
      store.IsActive = false;
      store.UpdatedAt = new Date();
      await this.storeRepository.save(store);

      return this.GetStoreByStoreId(store.Id);
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
