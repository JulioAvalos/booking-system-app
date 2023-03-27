export const bookingList = [
    {
        dayMonth: '4 / Mayo',
        startTime: '8:30am',
        endTime: '12:00pm',
        roomName: 'Tunco',
        status: 'active',
    },
    {
        dayMonth: '5 / Mayo',
        startTime: '8:30am',
        endTime: '12:00pm',
        roomName: 'Basilisco',
        status: 'inactive',
    },
    {
        dayMonth: '6 / Mayo',
        startTime: '8:30am',
        endTime: '12:00pm',
        roomName: 'Ilobasco',
        status: 'active',
    },

    {
        dayMonth: '7 / Mayo',
        startTime: '8:30am',
        endTime: '12:00pm',
        roomName: 'Ilobasco',
        status: 'inactive',
    }
];

export const levelList = [
    {
        id: 1,
        name: "Nivel 1",
        buildingId: 1,
        createdAt: "2023-03-24T07:40:32.761Z",
        createdBy: "admin",
        updatedAt: null,
        updatedBy: null
    },
    {
        id: 2,
        name: "Nivel 2",
        buildingId: 1,
        createdAt: "2023-03-24T07:40:32.761Z",
        createdBy: "admin",
        updatedAt: null,
        updatedBy: null
    }
];

export const roomList = [
    {
        id: 1,
        name: 'Suchitoto 1',
        level: 'Primer nivel',
        capacity: 12,
        photoUrl: 'https://example.com/suchitoto.jpg',
        status: 'Activa'
    },
    {
        id: 2,
        name: 'Tazumal 1',
        level: 'Primer nivel',
        capacity: 8,
        photoUrl: 'https://example.com/tazumal.jpg',
        status: 'Inactiva'
    },
    {
        id: 3,
        name: 'Joya de Cerén 1',
        level: 'Primer nivel',
        capacity: 6,
        photoUrl: 'https://example.com/joya-de-ceren.jpg',
        status: 'Ocupada'
    }
];

export const statusList = [
    {
        id: 1,
        name: 'Activo',
        value: 'active'
    },
    {
        id: 2,
        name: 'Inactivo',
        value: 'inactive'
    },
    {
        id: 3,
        name: 'Ocupado',
        value: 'busy'
    },
];


export const updateRoomSample = {
    "name": "Basilisco",
    "capacity": 1,
    "status": {"id": 1, "name": "Activo", "value": "active"},
    "level": {
        "id": 1,
        "name": "Nivel 1",
        "buildingId": 1,
        "createdAt": "2023-03-24T07:40:32.761Z",
        "createdBy": "admin",
        "updatedAt": null,
        "updatedBy": null
    },
    "photoUrl": ""
}
