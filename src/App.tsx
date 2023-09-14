import { BrowserRouter, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";

const Preview = loadable(()=>import("./pages/preview"));
const NotFound = loadable(()=>import("./pages/not-found"));
const FormDataBansos = loadable(()=>import("./pages/form-data-bansos"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormDataBansos />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
