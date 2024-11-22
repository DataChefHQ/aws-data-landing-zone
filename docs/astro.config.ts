import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'Data Landing Zone',
        social: {
            github: 'https://github.com/withastro/starlight',
        },
        sidebar: [
            {
                label: 'Introduction', slug: 'introduction'
            },
            {
                label: 'Getting Started', slug: 'getting-started'
            },
            {
                label: 'Tutorial',
                collapsed: true,
                items: [
                        { label: 'Overview',  slug: 'introduction'},
                        { label: '1. Step',  slug: 'introduction'},
                        { label: '2. Step',  slug: 'introduction'},
                    ],
            },
            {
                label: 'Components',
                items: [
                    {
                        label: 'Account Management',
                        items: [
                            { label: 'Overview',  slug: 'introduction'},
                            { label: 'Tagging',  slug: 'introduction'},
                            { label: 'Budgets',  slug: 'introduction'},
                            { label: 'SOP - Create Account',  slug: 'introduction'},
                            { label: 'SOP - Add Account & Bootstrap',  slug: 'introduction'},
                        ]
                    },
                    {
                        label: 'Networking',
                        items: [
                            { label: 'Overview',  slug: 'introduction'},
                            { label: 'VPCs',  slug: 'introduction'},
                            { label: 'NATs',  slug: 'introduction'},
                            { label: 'Bastion Hosts',  slug: 'introduction'},
                            { label: 'VPC Peering',  slug: 'introduction'},
                        ]
                    },
                    {
                        label: 'Security',
                        items: [
                            { label: 'Overview',  slug: 'introduction'},
                            { label: 'Service Control Policies',  slug: 'introduction'},
                            { label: 'Permission Boundary',  slug: 'introduction'},
                            { label: 'SecurityHub',  slug: 'introduction'},
                            { label: 'Control Tower Controls',  slug: 'introduction'},
                            { label: 'AWS Config',  slug: 'introduction'},
                            { label: 'AWS Guard Duty',  slug: 'introduction'},
                            { label: 'AWS Macie',  slug: 'introduction'},
                        ]
                    },
                    {
                        label: 'Identity',
                        items: [
                            { label: 'Overview',  slug: 'introduction'},
                            { label: 'Iam Identity Center',  slug: 'introduction'},
                        ]
                    },
                    {
                        label: 'Data Services',
                        items: [
                            { label: 'Overview',  slug: 'introduction'},
                            { label: 'LakeFormation',  slug: 'introduction'},
                        ]
                    },
                    {
                        label: 'Build System',
                        items: [
                            { label: 'Overview',  slug: 'introduction'},
                            { label: 'GitHub OIDC',  slug: 'introduction'},
                            { label: 'Any CI/CD system',  slug: 'introduction'},
                        ]
                    },
                    {
                        label: 'Reference',
                        items: [
                            { label: 'API',  slug: 'introduction'},
                            { label: 'Defaults',  slug: 'introduction'},
                            { label: 'Config sharing',  slug: 'introduction'},
                            { label: 'Scripts & commands',  slug: 'introduction'},
                            { label: 'Roadmap',  slug: 'introduction'},
                        ]
                    },
                ],
            },

        ],
		})
		],
});