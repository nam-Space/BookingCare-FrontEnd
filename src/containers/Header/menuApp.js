export const adminMenu = [
    {
        //hệ thống
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.admin.manage-user",
                link: "/system/user-redux",
            },
            {
                name: "menu.admin.manage-doctor",
                link: "/system/manage-doctor",
            },
            {
                name: "menu.doctor.manage-schedule",
                link: "/doctor/manage-schedule",
            },
        ],
    },
    {
        //manage clinic
        name: "menu.admin.clinic",
        menus: [
            {
                name: "menu.admin.manage-clinic",
                link: "/system/manage-clinic",
            },
        ],
    },
    {
        //manage specialty
        name: "menu.admin.specialty",
        menus: [
            {
                name: "menu.admin.manage-specialty",
                link: "/system/manage-specialty",
            },
        ],
    },
    {
        //manage handbook
        name: "menu.admin.handbook",
        menus: [
            {
                name: "menu.admin.manage-handbook",
                link: "/system/manage-handbook",
            },
        ],
    },
];

export const doctorMenu = [
    // quản lý kế hoạch của bác sỹ
    {
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.doctor.manage-schedule",
                link: "/doctor/manage-schedule",
            },
            {
                name: "menu.doctor.manage-patient",
                link: "/doctor/manage-patient",
            },
        ],
    },
];
