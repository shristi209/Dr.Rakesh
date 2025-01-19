import Breadcrumb from "@/components/website/Breadcrumb";

export default function Page(){
    const breadcrumbItems = [
        {
          label: 'About Us',
          href: '/admin/about-us',
        },
      ];
      return(
        <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      )
}