// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconFolder, IconTimeline } from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconFolder,
    IconTimeline
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        // {
        //     id: 'default',
        //     title: <FormattedMessage id="default" />,
        //     type: 'item',
        //     url: '/dashboard/sample-page',
        //     icon: icons.IconDashboard,
        //     breadcrumbs: false
        // },
        {
            id: 'deliveryefficiency',
            title: <FormattedMessage id="deliveryefficiency" />,
            type: 'item',
            url: '/dashboard/delivery-efficiency',
            icon: icons.IconTimeline,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
