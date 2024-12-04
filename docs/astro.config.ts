import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeMermaid from "rehype-mermaid";
import starlightImageZoom from 'starlight-image-zoom'

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
                            { label: 'Overview',  slug: 'introduction'},
                            { label: 'Accounts',  slug: 'components/account-management/accounts'},
                            { label: 'Regions',  slug: 'components/account-management/regions'},
                            { label: 'Tagging',  slug: 'components/account-management/tagging'},
                            { label: 'Budgets',  slug: 'components/account-management/budgets'},
                            { label: 'SOP - Initial Control Tower Setup',  slug: 'components/account-management/sop-initial-control-tower-setup'},
                            { label: 'SOP - Add Account',  slug: 'components/account-management/sop-add-account'},
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
                    //         { label: 'Service Control Policies',  slug: 'introduction'},
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
                            { label: 'Overview',  slug: 'components/build-system/overview'},
                            { label: 'Deployment Order',  slug: 'components/build-system/deployment-order'},
                            { label: 'CI Integration',  slug: 'components/build-system/ci-integration'},
                        ]
                    },
                ],
            },
            {
                label: 'Reference',
                items: [
                    { label: 'API',  slug: 'reference/api'},
                    // TODO: Complete docs
                    // { label: 'Defaults',  slug: 'introduction'},
                    // { label: 'Config sharing',  slug: 'introduction'},
                    { label: 'Scripts & commands',  slug: 'reference/scripts-commands'},
                    // { label: 'Roadmap',  slug: 'introduction'},
                ]
            },

        ],
        customCss: [
            './src/styles/custom.css',
        ],
        plugins: [starlightImageZoom()],
		})],
    markdown: {
        rehypePlugins: [ [rehypeMermaid, {strategy: "img-png", mermaidConfig:{ theme: 'neutral' } }] ], // CSS styles do not apply, have to inline
        // rehypePlugins: [ rehypeMermaid ], //For occasional testing, see the SVG component and class names
    },
});