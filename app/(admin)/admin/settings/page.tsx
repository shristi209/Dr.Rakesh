// Page Component
import { Breadcrumb } from "@/components/website/Breadcrumb";
import SettingsDetails from "@/components/dashboard/settingsDetails";
import { getDbPool } from "@/admin/utils/db";

interface SiteSetting {
  name: string;
  specialist: string;
  description?: string;
  logo?: string;
  image?: string;
}

async function fetchCurrentSettings(): Promise<Record<string, string>> {
  try {
    const pool = await getDbPool();
    
    const result = await pool.request()
      .query('SELECT TOP 1 name, specialist, description, logo, image FROM settings');

    // If no records found, return an empty object
    if (!result.recordset || result.recordset.length === 0) {
      console.warn('No settings found in database.');
      return {};
    }

    // Convert first record to a flat key-value record
    const settings = result.recordset.reduce((acc: Record<string, string>, setting: SiteSetting) => {
      if (setting.name) acc['name'] = setting.name;
      if (setting.specialist) acc['specialist'] = setting.specialist;
      if (setting.description) acc['description'] = setting.description;
      if (setting.logo) acc['logo'] = setting.logo;
      if (setting.image) acc['image'] = setting.image;
      return acc;
    }, {});
    // console.log('Settings fetched successfully:', settings);

    return settings;
  } catch (error) {
    // Log the full error for debugging
    console.error("Error fetching settings:", error);
    
    // Return an empty object in case of any database error
    return {};
  }
}

export default async function Page() {
  const breadcrumbItems = [
    {
      label: "Settings",
      href: "/admin/settings",
    },
  ];

  const currentSettings = await fetchCurrentSettings();
  console.log('Current Settings:', currentSettings);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <SettingsDetails initialSettings={currentSettings} />
    </>
  );
}
