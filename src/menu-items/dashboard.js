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
            id: 'singleinput',
            title: <FormattedMessage id="singleinput" />,
            type: 'item',
            url: '/dashboard/single-input',
            icon: icons.IconTimeline,
            breadcrumbs: false
        },
        {
            id: 'fileinput',
            title: <FormattedMessage id="fileinput" />,
            type: 'item',
            url: '/dashboard/file-input',
            icon: icons.IconFolder,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
