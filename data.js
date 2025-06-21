// Load site data from localStorage and apply to the page
window.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('siteData'));
    if (!data) return;

    if (data.color) {
        document.documentElement.style.setProperty('--color-primary', data.color);
    }

    if (data.aboutText) {
        const about = document.getElementById('about-text');
        if (about) about.textContent = data.aboutText;
    }

    if (data.social) {
        const container = document.getElementById('social-icons');
        if (container) {
            container.innerHTML = '';
            data.social.forEach(s => {
                const a = document.createElement('a');
                a.href = s.link;
                a.target = '_blank';
                const i = document.createElement('i');
                i.className = s.icon;
                a.appendChild(i);
                container.appendChild(a);
            });
        }
    }

    if (data.skills) {
        const container = document.getElementById('skills');
        if (container) {
            container.innerHTML = '';
            data.skills.forEach(skill => {
                const bar = document.createElement('div');
                bar.className = 'progress-bar';
                const p = document.createElement('p');
                p.className = 'prog-title';
                if (skill.certificate) {
                    const a = document.createElement('a');
                    a.href = skill.certificate;
                    a.target = '_blank';
                    a.textContent = skill.name;
                    p.appendChild(a);
                } else {
                    p.textContent = skill.name;
                }
                const con = document.createElement('div');
                con.className = 'progress-con';
                const t = document.createElement('p');
                t.className = 'prog-text';
                t.textContent = skill.percent + '%';
                const prog = document.createElement('div');
                prog.className = 'progress';
                const span = document.createElement('span');
                span.style.width = skill.percent + '%';
                prog.appendChild(span);
                con.appendChild(t);
                con.appendChild(prog);
                bar.appendChild(p);
                bar.appendChild(con);
                container.appendChild(bar);
            });
        }
    }

    if (data.projects) {
        const container = document.getElementById('projects');
        if (container) {
            container.innerHTML = '';
            data.projects.forEach(pr => {
                const item = document.createElement('div');
                item.className = 'portfolio-item';
                const imgDiv = document.createElement('div');
                imgDiv.className = 'image';
                const img = document.createElement('img');
                img.src = pr.image || '';
                imgDiv.appendChild(img);
                item.appendChild(imgDiv);
                const hover = document.createElement('div');
                hover.className = 'hover-items';
                const h3 = document.createElement('h3');
                h3.textContent = pr.title;
                hover.appendChild(h3);
                const desc = document.createElement('p');
                desc.textContent = pr.description || '';
                hover.appendChild(desc);
                const icons = document.createElement('div');
                icons.className = 'icons';
                if (pr.link) {
                    const a = document.createElement('a');
                    a.href = pr.link;
                    a.className = 'icon';
                    const i = document.createElement('i');
                    i.className = 'fab fa-github';
                    a.appendChild(i);
                    icons.appendChild(a);
                }
                hover.appendChild(icons);
                if (pr.languages) {
                    const langDiv = document.createElement('div');
                    langDiv.className = 'icons';
                    pr.languages.forEach(l => {
                        const span = document.createElement('span');
                        span.className = 'icon';
                        span.textContent = l;
                        langDiv.appendChild(span);
                    });
                    hover.appendChild(langDiv);
                }
                item.appendChild(hover);
                container.appendChild(item);
            });
        }
    }
});
