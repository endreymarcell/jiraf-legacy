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
        fields: {
            // This is the field's name in JIRA, I can't change it
            // eslint-disable-next-line
            customfield_10005: 3,
            summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description:
                " Integer purus mi, interdum eu imperdiet vitae, luctus eu nibh. Pellentesque at venenatis massa, quis ultrices tellus.",
            assignee: {
                name: "marcell.endrey",
            },
            priority: {
                name: "Prio3 - Medium",
            },
            status: {
                name: "In Progress",
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

module.exports = mockData;
