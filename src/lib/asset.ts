// Prefija una ruta de /public con la base del sitio (import.meta.env.BASE_URL).
// En la raíz BASE_URL es "/"; en GitHub Pages (proyecto) es "/<repo>/".
// Así los assets cargan igual en producción y en el deploy de Pages.
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL; // termina en "/"
  return base.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}
