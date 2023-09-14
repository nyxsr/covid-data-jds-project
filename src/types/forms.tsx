export type FormData = {
    name: string;
    nik: number;
    kk: number;
    file_ktp: File | string;
    file_kk: File | string;
    age: number;
    gender: gender;
    province: string;
    city: string;
    district: string;
    village: string;
    address: string;
    rt: string | number;
    rw: string | number;
    income_before: number;
    income_after: number;
    reason: string | reasonChoice;
    other_reason: string;
  };

  export type Province = {
    id: string;
    name: string;
  };
  
  export type City = {
    id: string;
    name: string;
    province_id: string;
  };
  
  export type District = {
    id: string;
    name: string;
    regency_id: string;
  };
  
  export type Village = {
    id: string;
    name: string;
    district_id: string;
  };
  
  export type FilterOption = {
    label: string;
    value: string;
  };

  enum gender {
    "Laki-laki",
    "Perempuan",
  }
  
  enum reasonChoice {
    "Kehilangan pekerjaan",
    "Kepala keluarga terdampak atau korban covid-19",
    "Tergolong fakir/miskin semenjak sebelum pandemi covid-19",
  }