import BaseLayout from "@/components/templates/base-layout/BaseLayout";
import FormData from "./FormDataBansos";
import Helmet from "react-helmet";

function index() {
  return (
    <BaseLayout>
      <Helmet>
        <title>
          Isi Data Penerima Bansos | Kementerian Kesehatan Republik Indonesia
        </title>
      </Helmet>
      <FormData />
    </BaseLayout>
  );
}

export default index;
