import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import rehypeMermaid from "rehype-mermaid";
import starlightImageZoom from 'starlight-image-zoom';

let site: string;
if (process.env.CF_PAGES_BRANCH) {
    if (process.env.CF_PAGES_BRANCH === 'main') {
        site = 'https://datalandingzone.com';
    } else {
        const subDomain = process.env.CF_PAGES_BRANCH.replaceAll(/[\/\s.]/g, '-') + '.';
        site = `https://${subDomain}datalandingzone.pages.dev`;
    }
} else {
    site = 'http://localhost:4321';
}

export default defineConfig({
    site: site,
    devToolbar: {
        enabled: false,
    },
    integrations: [starlight({
        title: 'Data Landing Zone',
        components: {
            Footer: './src/components/Footer.astro',
        },
        social: {
            github: 'https://github.com/withastro/starlight', //TODO
        },
        sidebar: [
            {
                label: 'Introduction', slug: 'introduction'
            },
            // TODO: Complete docs
            {
                label: 'Getting Started', slug: 'getting-started'
            },
            // {
            //     label: 'Tutorial',
            //     collapsed: true,
            //     items: [
            //             { label: 'Overview',  slug: 'introduction'},
            //             { label: '1. Step',  slug: 'introduction'},
            //             { label: '2. Step',  slug: 'introduction'},
            //         ],
            // },
            {
                label: 'Components',
                items: [
                    // TODO: Complete docs
                    {
                        label: 'Account Management',
                        items: [
                            { label: 'Accounts',  slug: 'components/account-management/accounts'},
                            { label: 'Regions',  slug: 'components/account-management/regions'},
                            { label: 'Tagging',  slug: 'components/account-management/tagging'},
                            { label: 'Budgets',  slug: 'components/account-management/budgets'},
                            // { label: 'Default Notifications',  slug: 'components/account-management/budgets'}, //TODO Later
                            { label: 'SOP - Initial Control Tower Setup',  slug: 'components/account-management/sop-initial-control-tower-setup'},
                            { label: 'SOP - Add Account',  slug: 'components/account-management/sop-add-account'},
                            { label: 'SOP - Account Setup',  slug: 'components/account-management/sop-account-setup'},
                        ]
                    },
                    // {
                    //     label: 'Networking',
                    //     items: [
                    //         { label: 'Overview',  slug: 'introduction'},
                    //         { label: 'VPCs',  slug: 'introduction'},
                    //         { label: 'NATs',  slug: 'introduction'},
                    //         { label: 'Bastion Hosts',  slug: 'introduction'},
                    //         { label: 'VPC Peering',  slug: 'introduction'},
                    //     ]
                    // },
                    // {
                    //     label: 'Security',
                    //     items: [
                    //         { label: 'Overview',  slug: 'introduction'},
                    //         { label: 'Service Control Policies',  slug: 'introduction'}, // Mention the service deny list
                    //         { label: 'Permission Boundary',  slug: 'introduction'},
                    //         { label: 'SecurityHub',  slug: 'introduction'},
                    //         { label: 'Control Tower Controls',  slug: 'introduction'},
                    //         { label: 'AWS Config',  slug: 'introduction'},
                    //         { label: 'AWS Guard Duty',  slug: 'introduction'},
                    //         { label: 'AWS Macie',  slug: 'introduction'},
                    //     ]
                    // },
                    // {
                    //     label: 'Identity',
                    //     items: [
                    //         { label: 'Overview',  slug: 'introduction'},
                    //         { label: 'Iam Identity Center',  slug: 'introduction'},
                    //     ]
                    // },
                    // {
                    //     label: 'Data Services',
                    //     items: [
                    //         { label: 'Overview',  slug: 'introduction'},
                    //         { label: 'LakeFormation',  slug: 'introduction'},
                    //     ]
                    // },
                    {
                        label: 'Build System',
                        items: [
                            { label: 'Deployment Order',  slug: 'components/build-system/deployment-order'},
                            { label: 'CI Integration',  slug: 'components/build-system/ci-integration'},
                        ]
                    },
                    {
                        label: 'Lake Formation',
                        items: [
                            { label: 'Introduction', slug: 'components/lake-formation/introduction' },
                            { label: 'How TBAC Works', slug: 'components/lake-formation/lf-tbac-guide' },
                            { label: 'TBAC recommended strategy', slug: 'components/lake-formation/lf-tbac-strategy' },
                        ]
                    }
                ],
            },
            {
                label: 'Reference',
                items: [
                    // TODO: Complete docs
                    { label: 'API',  slug: 'reference/api'},
                    { label: 'Defaults',  slug: 'reference/defaults'},
                    // { label: 'Config sharing',  slug: 'introduction'},
                    { label: 'Scripts & commands', slug: 'reference/scripts-commands' },
                    // { label: 'Roadmap',  slug: 'introduction'},
                    // { label: 'Escape Hatches',  slug: 'introduction'}, // How to extend and modify/add components
                ]
            },

        ],
        customCss: [
            './src/styles/custom.css',
        ],
        plugins: [starlightImageZoom()],
    })],
    markdown: {
        rehypePlugins: [[rehypeMermaid, { strategy: "img-png", mermaidConfig: { theme: 'neutral' } }]], // CSS styles do not apply, have to inline
        // rehypePlugins: [ rehypeMermaid ], //For occasional testing, see the SVG component and class names
    },
});