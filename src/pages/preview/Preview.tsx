import image from "@/constants/fail-handler/image";
import Banner2 from "@/assets/images/banner2.webp";
import { Image, Table } from "antd";
import React, { useEffect, useState } from "react";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { FormData as FormDataHook } from "@/types/forms";

type DataType = {
  key: React.Key;
};

type DataSource = DataType & FormDataHook;

function Preview() {
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  
  console.log(dataSource);
  

  function getData() {
    const data = localStorage.getItem("data-bansos-covid");
    if (data) {
      const parsedData = JSON.parse(data);
      const newData = parsedData.map((item: FormDataHook, index: number) => {
        return {
          ...item,
          key: index,
          index: index + 1,
        };
      }
        );
      setDataSource(newData);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <div className="relative z-10 w-full h-[18rem] mb-5">
        <div className="bg-gradient-to-tr from-[#035F12]/30 to-[#9FC510]/30 w-full h-full absolute z-10" />
        <img
          width={"100%"}
          height={350}
          className="object-cover md:object-[0px_-5rem] h-full w-full"
          src={Banner2}
          alt="placeholder"
          onError={(e) => {
            e.currentTarget.src = image.failImage;
          }}
        />
      </div>
      <div className="md:mx-0 mx-5">
        <div className="lg:flex lg:flex-col lg:items-center">
          <h1 className="antialiased text-3xl font-semibold md:font-medium">
            Tabel Data Bansos Covid-19
          </h1>
          <p className="text-sm md:text-base">
            Berikut adalah data yang telah diisi oleh Kepala Daerah
          </p>
        </div>
        <Table
          dataSource={dataSource}
          className="max-w-screen overflow-x-scroll mb-3"
        >
          <Column title="No" dataIndex="key" key="key" render={(value)=>{
            return value + 1
          }} />
          <Column title="Nama Lengkap" dataIndex="name" key="name" />
          <Column title="Usia" dataIndex="age" key="age" />
          <Column title="Jenis Kelamin" dataIndex="gender" key="gender" />
          <ColumnGroup title="KTP">
            <Column title="Nomor" dataIndex="nik" key="nik" />
            <Column
              title="Foto KTP"
              dataIndex="file_ktp"
              key="file_ktp"
              render={(value) => {
                return (
                  <Image
                    src={value}
                    onError={(e) => {
                      e.currentTarget.src = image.failImage;
                    }}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                );
              }}
            />
          </ColumnGroup>
          <ColumnGroup title="Kartu Keluarga">
            <Column title="Nomor" dataIndex="kk" key="kk" />
            <Column title="Foto KK" dataIndex="file_kk" key="file_kk" render={(value) => {
                return (
                  <Image
                    src={value}
                    onError={(e) => {
                      e.currentTarget.src = image.failImage;
                    }}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                );
              }}/>
          </ColumnGroup>
          <Column title="Provinsi" dataIndex="province" key="province" />
          <Column title="Kota" dataIndex="city" key="city" />
          <Column title="Kecamatan" dataIndex="district" key="district" />
          <Column title="Kelurahan" dataIndex="village" key="village" />
          <Column title="Alamat" dataIndex="address" key="address" />
          <Column title="RT" dataIndex="rt" key="rt" />
          <Column title="RW" dataIndex="rw" key="rw" />
          <Column
            title="Penghasilan Sebelum Pandemi"
            dataIndex="income_before"
            key="income_before"
          />
          <Column
            title="Penghasilan Setelah Pandemi"
            dataIndex="income_after"
            key="income_after"
          />
          <Column
            title="Alasan Butuh Bantuan"
            dataIndex="reason"
            key="reason"
          />
        </Table>
      </div>
    </section>
  );
}

export default Preview;
