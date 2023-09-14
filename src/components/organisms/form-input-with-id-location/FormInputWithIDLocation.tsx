import apiConfig from "@/constants/config/api";
import { FilterOption, Province, City, District, Village } from "@/types/forms";
import { FormInputWithIDLocationProps } from "@/types/props";
import { ConfigProvider, Select } from "antd";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

function FormInputWithIDLocation({
  register,
  errors,
  setValue,
  setSelected,
  selected,
}: FormInputWithIDLocationProps) {
  const [province, setProvince] = useState<FilterOption[]>([]);
  const [city, setCity] = useState<FilterOption[]>([]);
  const [district, setDistrict] = useState<FilterOption[]>([]);
  const [village, setVillage] = useState<FilterOption[]>([]);

  async function getProvince() {
    try {
      const response: AxiosResponse = await axios.get(
        apiConfig.apiIndonesiaRegion + "provinces.json"
      );
      const data = response.data;
      const provinces = data.map((province: Province) => ({
        value: province.id,
        label: province.name,
      }));
      setProvince(provinces);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCity(id: string) {
    try {
      const response: AxiosResponse = await axios.get(
        apiConfig.apiIndonesiaRegion + `regencies/${id}.json`
      );
      const data = response.data;
      const cities = data.map((city: City) => ({
        value: city.id,
        label: city.name,
      }));
      setCity(cities);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDistrict(id: string) {
    try {
      const response: AxiosResponse = await axios.get(
        apiConfig.apiIndonesiaRegion + `districts/${id}.json`
      );
      const data = response.data;
      const districts = data.map((district: District) => ({
        value: district.id,
        label: district.name,
      }));
      setDistrict(districts);
    } catch (error) {
      console.log(error);
    }
  }

  async function getVillage(id: string) {
    try {
      const response: AxiosResponse = await axios.get(
        apiConfig.apiIndonesiaRegion + `villages/${id}.json`
      );
      const data = response.data;
      const villages = data.map((village: Village) => ({
        value: village.id,
        label: village.name,
      }));
      setVillage(villages);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProvince();
  }, []);

  useEffect(() => {
    if (selected.province.id) {
      getCity(selected.province.id);
    }
  }, [selected.province.id]);

  useEffect(() => {
    if (selected.city.id) {
      getDistrict(selected.city.id);
    }
  }, [selected.city.id]);

  useEffect(() => {
    if (selected.district.id) {
      getVillage(selected.district.id);
    }
  }, [selected.district.id]);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
          colorPrimary: "#035F12",
        },
        components:{
          Select:{
            optionActiveBg: "#9FC510",
          }
        }
      }}
    >
      <div className="flex md:flex-row flex-col  justify-between gap-2 md:items-center">
        <div className="flex flex-col mt-3 md:w-1/2">
          <label htmlFor="Provinsi">Provinsi</label>
          <Select
            className="text-base"
            {...register("province", { required: "Provinsi wajib diisi" })}
            onChange={(value) => {
              setSelected({
                ...selected,
                province: {
                  id: value,
                  name:
                    province.find((prov) => prov.value === value)?.label || "",
                },
              });
              setValue("province",value)
            }}
            placeholder="Pilih Provinsi"
            options={province}
          />
          {errors.province && (
            <span className="text-red-500">{errors.province.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-3 md:w-1/2">
          <label htmlFor="Kabupaten/Kota">Kabupaten/Kota</label>
          <Select
            className="text-base"
            {...register("city", { required: "Kabupaten/Kota wajib diisi" })}
            placeholder="Pilih Provinsi"
            optionFilterProp="children"
            onChange={(value) => {
              setSelected({
                ...selected,
                city: {
                  id: value,
                  name: city.find((city) => city.value === value)?.label || "",
                },
              });
              setValue("city",value)
            }}
            disabled={!selected.province.id}
            options={city}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>
      </div>
      <div className="flex md:flex-row flex-col  justify-between gap-2 md:items-center">
        <div className="flex flex-col mt-3 md:w-1/2">
          <label htmlFor="Kecamatan">Kecamatan</label>
          <Select
            className="text-base"
            {...register("district", { required: "Kecamatan wajib diisi" })}
            onChange={(value) => {
              setSelected({
                ...selected,
                district: {
                  id: value,
                  name:
                    district.find((district) => district.value === value)
                      ?.label || "",
                },
              });
              setValue("district",value)
            }}
            disabled={!selected.city.id}
            placeholder="Pilih Kecamatan"
            optionFilterProp="children"
            options={district}
          />
          {errors.district && (
            <span className="text-red-500">{errors.district.message}</span>
          )}
        </div>
        <div className="flex flex-col mt-3 md:w-1/2">
          <label htmlFor="Kelurahan">Kelurahan</label>
          <Select
            className="text-base"
            {...register("village", { required: "Kelurahan wajib diisi" })}
            onChange={(value) => {
              setSelected({
                ...selected,
                village: {
                  id: value,
                  name:
                    village.find((village) => village.value === value)?.label ||
                    "",
                },
              });
              setValue("village",value)
            }}
            disabled={!selected.district.id}
            placeholder="Pilih Kelurahan/Desa"
            optionFilterProp="children"
            options={village}
          />
          {errors.village && (
            <span className="text-red-500">{errors.village.message}</span>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default FormInputWithIDLocation;
