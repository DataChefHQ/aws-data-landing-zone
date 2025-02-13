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

const ogUrl = `${site}/dlz-dark-og.png`;
const trackAnalytics = process.env.CF_PAGES_BRANCH === 'main';

interface HeadConfig {
    tag: 'title' | 'base' | 'link' | 'style' | 'meta' | 'script' | 'noscript' | 'template';
    attrs: Record<string, string | boolean | undefined>;
    content?: string;
}
let head: HeadConfig[] = [
    {
        tag: 'meta',
        attrs: { property: 'og:image', content: ogUrl },
    },
    {
        tag: 'meta',
        attrs: { property: 'og:image:alt', content: "Data Landing Zone" },
    },
    {
        tag: 'meta',
        attrs: { property: 'og:image:type', content: "image/png" },
    },
];

if(trackAnalytics) {
    head.push({
        tag: 'script',
        attrs: {
            src: 'https://cdn.usefathom.com/script.js',
            'data-site': 'CTOOTLUX',
            defer: true,
        },
    });
}

export default defineConfig({
    site: site,
    devToolbar: {
        enabled: false,
    },
    integrations: [starlight({
        title: 'Data Landing Zone',
        favicon: 'favicon.png',
        components: {
            Footer: './src/components/Footer.astro',
        },
        social: {
            github: 'https://github.com/DataChefHQ/aws-data-landing-zone',
        },
        head: head,
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
                        ]
                    },
                    {
                        label: 'Networking',
                        items: [
                            { label: 'VPCs',  slug: 'components/networking/vpcs'},
                            { label: 'NATs',  slug: 'components/networking/nats'},
                            { label: 'Bastion Hosts',  slug: 'components/networking/bastion-hosts'},
                            { label: 'VPC Peering',  slug: 'components/networking/vpc-peering'},
                        ]
                    },
                    {
                        label: 'Security',
                        items: [
                            { label: 'SecurityHub',  slug: 'components/security/security-hub'},
                            { label: 'Control Tower Controls',  slug: 'components/security/control-tower-controls'},
                            { label: 'Service Deny Lists',  slug: 'components/security/service-deny-list'}, // Change to SCPs when we support them externally and make the deny list a subheading
                            { label: 'IAM Permission Boundary',  slug: 'components/security/iam-permission-boundary'},
                            // { label: 'AWS Config',  slug: 'introduction'},
                            // { label: 'AWS Guard Duty',  slug: 'introduction'},
                            // { label: 'AWS Macie',  slug: 'introduction'},
                        ]
                    },
                    {
                        label: 'Identity',
                        items: [
                            { label: 'IAM Identity Center',  slug: 'components/identity/iam-identity-center'},
                            { label: 'IAM',  slug: 'components/identity/iam'},
                        ]
                    },
                    {
                        label: 'Data Services',
                        items: [
                            {
                                label: 'Lake Formation',  slug: 'components/data-services/lake-formation'
                            },
                        ]
                    },
                    {
                        label: 'Build System',
                        items: [
                            { label: 'Deployment Order',  slug: 'components/build-system/deployment-order'},
                            { label: 'CI Integration',  slug: 'components/build-system/ci-integration'},
                        ]
                    }
                ],
            },
            {
                label: 'Integration',
                items: [
                    { label: 'Exported SSM Parameters',  slug: 'reference/integration/exported-ssm-parameters'},
                    { label: 'CDK Client',  slug: 'reference/integration/cdk-client'},
                ]
            },
            {
                label: 'SOPs',
                items: [
                    { label: 'Initial Control Tower Setup',  slug: 'sop/initial-control-tower-setup'},
                    { label: 'Add Account',  slug: 'sop/add-account'},
                    { label: 'Account Setup',  slug: 'sop/account-setup'},
                    { label: 'IAM Identity Center',  slug: 'sop/iam-identity-center'},
                    { label: 'AWS Nuke',  slug: 'sop/aws-nuke'},
                ]
            },
            {
                label: 'Reference',
                items: [
                    // TODO: Complete docs
                    { label: 'API',  slug: 'reference/api'},
                    { label: 'Defaults',  slug: 'reference/defaults'},
                    { label: 'Scripts & commands', slug: 'reference/scripts-commands' },
                    { label: 'Extending and Escape Hatches',  slug: 'reference/extending-and-escape-hatches'},
                    { label: 'Lake Formation TBAC strategy', slug: 'reference/lake-formation-tbac-recommended-strategy' },
                    { label: 'Network Address',  slug: 'reference/network-address'},
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
        rehypePlugins: [[rehypeMermaid, { strategy: "img-png", mermaidConfig: { theme: 'neutral' } }]], // CSS styles do not apply, have to inline
        // rehypePlugins: [ rehypeMermaid ], //For occasional testing, see the SVG component and class names
    },
});