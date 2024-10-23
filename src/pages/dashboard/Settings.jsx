import SettingForm from "@/features/settings/SettingForm";
import { Card } from "flowbite-react";

export default function Settings() {
  return (
    <Card className="shadow-none">
      <h5 className="text-2xl font-bold">Pengaturan</h5>
      <SettingForm />
    </Card>
  );
};
