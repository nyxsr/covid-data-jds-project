import Banner from "@/assets/images/banner.webp";
import image from "@/constants/fail-handler/image";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Input,
  InputNumber,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import FormInputWithIDLocation from "@/components/organisms/form-input-with-id-location/FormInputWithIDLocation";
import { FormData as FormDataHook } from "@/types/forms";
import Swal from "sweetalert2";
import randomizeWithProbability from "@/utils/randomizer";
import apiConfig from "@/constants/config/api";
import createDataUrl from "@/utils/createDataUrl";

function FormDataBansos() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormDataHook>();

  const [ktp, setKtp] = useState<UploadFile[]>([]);
  const [kk, setKk] = useState<UploadFile[]>([]);
  const [userAgreed, setUserAgreed] = useState(false);
  const [selected, setSelected] = useState({
    province: {
      id: "",
      name: "",
    },
    city: {
      id: "",
      name: "",
    },
    district: {
      id: "",
      name: "",
    },
    village: {
      id: "",
      name: "",
    },
  });

  const reason = watch("reason");

  async function saveToLocalStorage(data: FormDataHook) {
    return new Promise((resolve, reject) => {
      const randomProbability = randomizeWithProbability(0.8);
      if (randomProbability) {
        setTimeout(() => {
          if (localStorage.getItem("data-bansos-covid")) {
            const dataFromLocalStorage = JSON.parse(
              localStorage.getItem("data-bansos-covid") as string
            ) as FormDataHook[];
            localStorage.setItem(
              "data-bansos-covid",
              JSON.stringify([...dataFromLocalStorage, data])
            );
          } else {
            localStorage.setItem("data-bansos-covid", JSON.stringify([data]));
          }
          resolve(true);
        }, 1500);
      } else {
        setTimeout(() => {
          reject(false);
        }, apiConfig.timeout);
      }
    });
  }

  async function onSubmit(data: FormDataHook) {
    if (!userAgreed) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Mohon centang persetujuan",
      });
      return;
    }
    if (ktp.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "File KTP wajib diisi!",
      });
      return;
    }
    if (kk.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "File KK wajib diisi!",
      });
      return;
    }
    const foto_ktp = ktp[0]?.originFileObj as File;
    const foto_kk = kk[0]?.originFileObj as File;

    data.file_kk = await createDataUrl(foto_kk) as string;
    data.file_ktp = await createDataUrl(foto_ktp) as string;

    data.province = selected.province.name;
    data.city = selected.city.name;
    data.district = selected.district.name;
    data.village = selected.village.name;
    
    Swal.fire({
      icon: "info",
      title: "Mohon tunggu",
      text: "Sedang menyimpan data",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await saveToLocalStorage(data);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil disimpan",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Probabilitas untuk error adalah 20%");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan",
      });
    }
  }

  return (
    <section>
      <div className="relative z-10 w-full h-[18rem] mb-5">
        <div className="bg-gradient-to-tr from-[#035F12]/10 to-[#9FC510]/10 w-full h-full absolute z-10" />
        <img
          width={"100%"}
          height={350}
          className="object-cover md:object-[0px_-5rem] h-full w-full"
          src={Banner}
          alt="placeholder"
          onError={(e) => {
            e.currentTarget.src = image.failImage;
          }}
        />
      </div>
      <div className="md:mx-0 mx-5">
        <div className="lg:flex lg:flex-col lg:items-center">
          <h1 className="antialiased text-3xl font-semibold md:font-medium">
            Pencatatan Bansos Covid-19
          </h1>
          <p>Silahkan masukkan data-data calon penerima bansos covid-19</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 lg:w-[60%] mb-5"
          >
            <div className="flex flex-col mt-3">
              <label htmlFor="Nama Lengkap">Nama Lengkap</label>
              <input
                {...register("name", { required: "Nama lengkap wajib diisi!" })}
                className="border focus:outline-none focus:border-[#035F12] hover:border-[#035f12] transition-all border-gray-300 p-2 rounded-md"
                type="text"
                name="name"
                id="name"
                placeholder="Abidin Shaleh"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="flex md:flex-row flex-col justify-between gap-2">
              <div className="flex flex-col mt-3 md:w-1/2">
                <label htmlFor="NIK">NIK</label>
                <input
                  {...register("nik", {
                    required: "NIK wajib diisi!",
                    maxLength: 16,
                  })}
                  className="border focus:outline-none focus:border-[#035F12] hover:border-[#035f12] transition-all border-gray-300 p-2 rounded-md"
                  type="text"
                  name="nik"
                  id="nik"
                  maxLength={16}
                  placeholder="321xxxxxxxxxxxxx"
                />
                {errors.nik && (
                  <span className="text-red-500">{errors.nik.message}</span>
                )}
              </div>
              <div className="flex flex-col mt-3 md:w-1/2">
                <label htmlFor="Nomor KK">Nomor KK</label>
                <input
                  {...register("kk", {
                    required: "KK wajib diisi!",
                    maxLength: 16,
                  })}
                  className="border focus:outline-none focus:border-[#035F12] hover:border-[#035f12] transition-all border-gray-300 p-2 rounded-md"
                  type="text"
                  name="kk"
                  id="kk"
                  maxLength={16}
                  placeholder="321xxxxxxxxxxxxx"
                />
                {errors.kk && (
                  <span className="text-red-500">{errors.kk.message}</span>
                )}
              </div>
            </div>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#035F12",
                },
              }}
            >
              <div className="flex md:flex-row flex-col justify-between gap-2">
                <div className="flex flex-col mt-3 md:w-1/2">
                  <label htmlFor="File KTP">File KTP</label>
                  <Upload
                    beforeUpload={() => false}
                    listType="picture"
                    defaultFileList={[...ktp]}
                    accept="image/*"
                    className="border focus:outline-[#035F12] border-gray-300 p-2 rounded-md"
                    onChange={({ fileList }) => {
                      setKtp(fileList);
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                  {errors.file_ktp && (
                    <span className="text-red-500">
                      {errors.file_ktp.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mt-3 md:w-1/2">
                  <label htmlFor="File KK">File KK</label>
                  <Upload
                    beforeUpload={() => false}
                    listType="picture"
                    defaultFileList={[...kk]}
                    accept="image/*"
                    className="border focus:outline-[#035F12] border-gray-300 p-2 rounded-md"
                    onChange={({ fileList }) => {
                      setKk(fileList);
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                  {errors.file_ktp && (
                    <span className="text-red-500">
                      {errors.file_ktp.message}
                    </span>
                  )}
                </div>
              </div>
            </ConfigProvider>
            <div className="flex justify-between gap-2">
              <div className="flex flex-col mt-3 md:w-3/4 w-1/2">
                <label htmlFor="Jenis Kelamin">Jenis Kelamin</label>
                <select
                  className="border focus:outline-none focus:border-[#035F12] hover:border-[#035f12] transition-all border-gray-300 p-2.5 rounded-md"
                  {...register("gender", {
                    required: "Jenis kelamin wajib diisi",
                  })}
                  name="gender"
                  id="gender"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {errors.gender && (
                  <span className="text-red-500">{errors.gender.message}</span>
                )}
              </div>
              <div className="flex flex-col mt-3 md:w-1/4 w-1/2">
                <label htmlFor="Umur">Umur</label>
                <ConfigProvider
                  theme={{
                    components: {
                      Input: {
                        activeBorderColor: "#035F12",
                        hoverBorderColor: "#035F12",
                      },
                    },
                  }}
                >
                  <Input
                    suffix="Tahun"
                    {...register("age", {
                      required: "Umur wajib diisi!",
                      maxLength: 3,
                    })}
                    onChange={(e) => {
                      setValue("age", parseInt(e.target.value));
                    }}
                    className="border text-base border-gray-300 p-2 rounded-md"
                    type="number"
                    name="age"
                    id="age"
                    placeholder=""
                  />
                </ConfigProvider>
                {errors.age && (
                  <span className="text-red-500">{errors.age.message}</span>
                )}
              </div>
            </div>
            <FormInputWithIDLocation
              selected={selected}
              setSelected={setSelected}
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <div className="flex justify-between gap-2">
              <div className="flex flex-col mt-3 w-1/2">
                <label htmlFor="RT">RT</label>
                <ConfigProvider
                  theme={{
                    components: {
                      Input: {
                        activeBorderColor: "#035F12",
                        hoverBorderColor: "#035F12",
                      },
                    },
                  }}
                >
                  <Input
                    {...register("rt", {
                      required: "RT wajib diisi!",
                    })}
                    onChange={(e) => {
                      setValue("rt", parseInt(e.target.value));
                    }}
                    className="border text-base border-gray-300 p-2 rounded-md"
                    type="number"
                    name="rt"
                    id="rt"
                  />
                </ConfigProvider>
                {errors.rt && (
                  <span className="text-red-500">{errors.rt.message}</span>
                )}
              </div>
              <div className="flex flex-col mt-3 w-1/2">
                <label htmlFor="RW">RW</label>
                <ConfigProvider
                  theme={{
                    components: {
                      Input: {
                        activeBorderColor: "#035F12",
                        hoverBorderColor: "#035F12",
                      },
                    },
                  }}
                >
                  <Input
                    {...register("rw", {
                      required: "RW wajib diisi!",
                    })}
                    onChange={(e) => {
                      setValue("rw", parseInt(e.target.value));
                    }}
                    className="border text-base border-gray-300 p-2 rounded-md"
                    type="number"
                    name="rw"
                    id="rw"
                  />
                </ConfigProvider>
                {errors.rw && (
                  <span className="text-red-500">{errors.rw.message}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="Alamat Lengkap">Alamat Lengkap</label>
              <textarea
                {...register("address", {
                  required: "Alamat lengkap wajib diisi",
                  maxLength: 255,
                })}
                name="address"
                id="address"
                className="border resize-none focus:outline-none focus:border-[#035F12] hover:border-[#035f12] transition-all border-gray-300 p-2 rounded-md"
              ></textarea>
              {errors.address && (
                <span className="text-red-500">{errors.address.message}</span>
              )}
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="Penghasilan sebelum pandemi">
                Penghasilan sebelum pandemi
              </label>
              <ConfigProvider
                theme={{
                  components: {
                    InputNumber: {
                      activeBorderColor: "#035F12",
                      hoverBorderColor: "#035F12",
                    },
                  },
                }}
              >
                <InputNumber
                  prefix="Rp."
                  {...register("income_before", {
                    required: "Penghasilan sebelum pandemi wajib diisi!",
                  })}
                  className="border text-base border-gray-300 p-2 rounded-md w-full"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value) => {
                    const numericValue = typeof value === "number" ? value : 0;
                    setValue("income_before", numericValue);
                  }}
                />
              </ConfigProvider>
              {errors.income_before && (
                <span className="text-red-500">
                  {errors.income_before.message}
                </span>
              )}
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="Penghasilan setelah pandemi">
                Penghasilan setelah pandemi
              </label>
              <ConfigProvider
                theme={{
                  components: {
                    InputNumber: {
                      activeBorderColor: "#035F12",
                      hoverBorderColor: "#035F12",
                    },
                  },
                }}
              >
                <InputNumber
                  prefix="Rp."
                  {...register("income_after", {
                    required: "Penghasilan setelah pandemi wajib diisi!",
                  })}
                  className="border text-base border-gray-300 p-2 rounded-md w-full"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value) => {
                    const numericValue = typeof value === "number" ? value : 0;
                    setValue("income_after", numericValue);
                  }}
                />
              </ConfigProvider>
              {errors.income_before && (
                <span className="text-red-500">
                  {errors.income_before.message}
                </span>
              )}
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="Alasan">Alasan Membutuhkan Bantuan</label>
              <select
                className="border focus:outline-none focus:border-[#035F12] hover:border-[#035f12] transition-all border-gray-300 p-2 rounded-md"
                {...register("reason", { required: "Alasan wajib diisi" })}
                name="reason"
                id="reason"
              >
                <option value="">Pilih Alasan anda</option>
                <option value="Kehilangan pekerjaan">
                  Kehilangan pekerjaan
                </option>
                <option value="Kepala keluarga terdampak atau korban covid-19">
                  Kepala keluarga terdampak atau korban covid-19
                </option>
                <option value="Tergolong fakir/miskin semenjak sebelum pandemi covid-19">
                  Tergolong fakir/miskin semenjak sebelum pandemi covid-19
                </option>
                <option value="other">Lainnya</option>
              </select>
              {reason === "other" && (
                <textarea
                  {...register("other_reason", {
                    required: "Alasan wajib diisi!",
                  })}
                  placeholder="Tuliskan alasan anda disini"
                  className="border resize-none mt-2 focus:outline-none focus:border-[#035F12] hover:border-[#035f12] transition-all border-gray-300 p-2 rounded-md"
                ></textarea>
              )}
              {errors.reason && (
                <span className="text-red-500">{errors.reason.message}</span>
              )}
              {errors.other_reason && (
                <span className="text-red-500">
                  {errors.other_reason.message}
                </span>
              )}
            </div>
            <div className="flex flex-col mt-3">
              <ConfigProvider
                theme={{
                  components: {
                    Checkbox: {
                      colorPrimary: "#9FC510",
                      colorPrimaryHover: "#9FC510",
                    },
                  },
                }}
              >
                <Checkbox
                  className=""
                  onChange={(e) =>
                    setUserAgreed(e.target.checked ? true : false)
                  }
                >
                  Saya menyatakan bahwa data yang diisikan adalah benar dan siap
                  mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam
                  data tersebut.
                </Checkbox>
              </ConfigProvider>
            </div>
            <button type="submit" className="py-2 rounded-md bg-[#9FC510] mt-3">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FormDataBansos;
