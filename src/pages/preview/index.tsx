import BaseLayout from "@/components/templates/base-layout/BaseLayout";
import Preview from "./Preview";
import { Helmet } from "react-helmet";

function index() {
  return (
    <BaseLayout>
      <Helmet>
        <title>
          Lihat Data Penerima Bansos | Kementerian Sosial Republik Indonesia
        </title>
      </Helmet>
      <Preview />
    </BaseLayout>
  );
}

export default index;
