import Breadcrumb from "@/components/website/Breadcrumb";

export default function Page(){
    const breadcrumbItems = [
        {
          label: 'Services',
          href: '/admin/services',
        },
      ];
      return(
        <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      )
}