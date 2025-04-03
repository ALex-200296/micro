import { Timeline, Typography } from "antd";

export default function Main(props) {
    return (
        <>
            <Typography.Title>OneTeam</Typography.Title>
            <Timeline
                items={[
                    {
                        children: 'Create a services site 2015-09-01',
                    },
                    {
                        children: 'Solve initial network problems 2015-09-01',
                    },
                    {
                        children: 'Technical testing 2015-09-01',
                    },
                    {
                        children: 'Network problems being solved 2015-09-01',
                    },
                ]}
            />
        </>
    )
}