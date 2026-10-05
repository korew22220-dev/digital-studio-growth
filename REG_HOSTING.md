# KOREMO on REG.RU

Production URL: https://koremo.ru/

The site is deployed as 18 static HTML pages with browser JavaScript and CSS.
The source remains in this repository. No Node.js server is required on Host-Lite.

## Build and publish

The `Build REG.RU hosting archive` workflow creates the `koremo-reg-hosting`
artifact on each main-branch push. Download the artifact, open its outer ZIP,
and upload `koremo-reg-hosting.zip` to ispmanager, under
`/www/koremo.ru`. Extract its contents directly into that directory.
Keep the `_next` directory and nested HTML directories intact.

This workflow builds an archive; it does not automatically upload future changes
to REG.RU. FTP/SFTP credentials are not stored in the repository.

The `Verify REG.RU website` workflow checks public HTTPS, origin TLS,
DNS, key pages and homepage CSS/JavaScript assets. It can be rerun manually.

GitHub Pages is retained as a manual deployment workflow.

## Hosting configuration

- Plan: Host-Lite.
- Origin IPv4: 31.31.196.115.
- Origin IPv6: 2a00:f940:2:2:1:1:0:249.
- Domain: koremo.ru.
- Site alias: www.koremo.ru.
- Document root: /var/www/u3672375/data/www/koremo.ru.
- Use the hosting DNS servers ns1.hosting.reg.ru and ns2.hosting.reg.ru
  for ispmanager-managed DNS validation and certificate renewal.
- Enable HTTPS redirection only after a trusted certificate is installed.
- Redirect www to the canonical apex domain while preserving paths and queries.

The static export has the same client-side contact behavior as the former
GitHub Pages deployment. Server-side Telegram delivery requires a separately
configured backend and is not provided by this static deployment.

## Secondary domain

`koremo.online` is a separate static site in the same hosting account, with
`www.koremo.online` as its alias. Its only purpose is an HTTP 301 redirect to
`https://koremo.ru/`, keeping page paths and query strings.

In ispmanager Redirects settings, use code 301, path `/(.*)` and URL
`https://koremo.ru/$1`. The simpler path `/` with a fixed destination discards
the original page path. Keep DNS on `ns1.hosting.reg.ru` and
`ns2.hosting.reg.ru`; apex and www use the same origin IPs as the primary site.
The separate Let's Encrypt request covers both secondary-domain names.
