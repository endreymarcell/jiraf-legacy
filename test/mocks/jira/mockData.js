const mockData = {
    boardId: {
        values: [
            {
                id: 987,
                name: "Lorem Ipsum board",
            },
        ],
    },
    boardConfig: {
        id: 987,
        name: "Lorem Ipsum board",
        columnConfig: {
            columns: [
                {
                    name: "Sprint Backlog",
                    statuses: [
                        {
                            id: "1",
                        },
                    ],
                },
                {
                    name: "In Progress",
                    statuses: [
                        {
                            id: "2",
                        },
                    ],
                },
                {
                    name: "Done",
                    statuses: [
                        {
                            id: "3",
                        },
                        {
                            id: "4",
                        },
                    ],
                },
            ],
        },
    },
    cardDetails: {
        todo: {
            key: "GRZ-1",
            fields: {
                // This is the field's name in JIRA, I can't change it
                // eslint-disable-next-line
                customfield_10005: 3,
                summary: "The future is coming on",
                description: "I ain't happy, I'm feeling glad, I got sunshine in a bag",
                assignee: {
                    name: "clint.eastwood",
                },
                priority: {
                    name: "Prio3 - Medium",
                },
                status: {
                    name: "To Do",
                },
            },
        },
        inProgress: {
            key: "GRZ-2",
            fields: {
                // This is the field's name in JIRA, I can't change it
                // eslint-disable-next-line
                customfield_10005: 1,
                summary: "19-2000",
                description: "The world is spinning too fast, I'm buying lead Nike shoes",
                assignee: {
                    name: "monkey.jungle",
                },
                priority: {
                    name: "Prio3 - Medium",
                },
                status: {
                    name: "In Progress",
                },
            },
        },
        done: {
            key: "GRZ-3",
            fields: {
                // This is the field's name in JIRA, I can't change it
                // eslint-disable-next-line
                customfield_10005: 2,
                summary: "Melancholy Hill",
                description: "If you can't get what you want then you come with me",
                assignee: {
                    name: "submarine",
                },
                priority: {
                    name: "Prio3 - Medium",
                },
                status: {
                    name: "Done",
                },
            },
        },
        wontFix: {
            key: "GRZ-4",
            fields: {
                // This is the field's name in JIRA, I can't change it
                // eslint-disable-next-line
                customfield_10005: 5,
                summary: "Humility",
                description: "Calling the world from isolation 'cause right now, that's the ball where we be chained",
                assignee: {
                    name: "george.benson",
                },
                priority: {
                    name: "Prio3 - Medium",
                },
                status: {
                    name: "Won't Fix",
                },
            },
        },
    },
    searchForOneCardTransitions: {
        issues: [
            {
                transitions: [
                    {
                        to: {
                            name: "To Do",
                            id: "1",
                        },
                    },
                    {
                        to: {
                            name: "In Progress",
                            id: "2",
                        },
                    },
                    {
                        to: {
                            name: "Done",
                            id: "3",
                        },
                    },
                    {
                        to: {
                            name: "Won't Fix",
                            id: "4",
                        },
                    },
                ],
            },
        ],
    },
};

mockData.cardsOnBoard = {
    issues: [
        mockData.cardDetails.todo,
        mockData.cardDetails.inProgress,
        mockData.cardDetails.done,
        mockData.cardDetails.wontFix,
    ],
};

module.exports = mockData;
