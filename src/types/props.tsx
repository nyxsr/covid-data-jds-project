import { FormData } from "@/types/forms";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

export type NavbarProps = {
  logo?: string;
};

export type BaseLayoutProps = {
  children: React.ReactNode;
};

export type FormInputWithIDLocationProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  selected: {
    province: {
      id: string;
      name: string;
    };
    city: {
      id: string;
      name: string;
    };
    district: {
      id: string;
      name: string;
    };
    village: {
      id: string;
      name: string;
    };
  };
  setSelected: React.Dispatch<
    React.SetStateAction<{
      province: {
        id: string;
        name: string;
      };
      city: {
        id: string;
        name: string;
      };
      district: {
        id: string;
        name: string;
      };
      village: {
        id: string;
        name: string;
      };
    }>
  >;
  setValue:UseFormSetValue<FormData>;
};
