export const shankeraPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shankera Liang',
  alternateName: ['Shankera', 'Shankera Dev', 'Shankera DevOps'],
  description: '專業 DevOps 工程師，專精於 AWS 雲端架構、Kubernetes 容器編排、CI/CD 自動化部署',
  jobTitle: 'DevOps Engineer',
  knowsAbout: [
    'DevOps',
    'AWS',
    'Kubernetes',
    'Docker',
    'Terraform',
    'Ansible',
    'CI/CD',
    'GitLab',
    'Jenkins',
    'Prometheus',
  ],
  url: 'https://shankera-s-dev-station.vercel.app',
  sameAs: [
    'https://github.com/cheng-hsin',
    'https://twitter.com/shankera_dev',
    'https://linkedin.com/in/shankera-liang',
  ],
  worksFor: {
    '@type': 'Organization',
    name: "Shankera's DevStation",
  },
  owns: {
    '@type': 'WebSite',
    name: "Shankera's DevStation",
    url: 'https://shankera-s-dev-station.vercel.app',
    description: 'Shankera 的 DevOps 技術部落格，分享 AWS、Kubernetes、Docker 等技術教學',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: "Shankera's DevStation",
  alternateName: ['Shankera DevStation', 'Shankera Blog', 'Shankera 部落格'],
  url: 'https://shankera-s-dev-station.vercel.app',
  description:
    'Shankera 的 DevOps 工程師技術部落格，提供 AWS、Kubernetes、Docker、Terraform 等技術教學與實戰經驗分享',
  author: {
    '@type': 'Person',
    name: 'Shankera Liang',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://shankera-s-dev-station.vercel.app/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}
