export const adminMenu = [
    {
        //hệ thống
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.admin.crud",
                link: "/system/user-manage",
            },
            {
                name: "menu.admin.crud-redux",
                link: "/system/user-redux",
            },
            {
                name: "menu.admin.manage-doctor",
                link: "/system/manage-doctor",
            },
            {
                name: "menu.admin.manage-admin",
                link: "/system/user-admin",
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
