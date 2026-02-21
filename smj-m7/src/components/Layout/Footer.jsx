import { Facebook, Github, Instagram, Twitter, Youtube } from 'lucide-react'

const sections = [
    {
        title: 'Colecciones',
        links: ['Collares', 'Pulseras', 'Aros', 'Sets', 'Edición limitada'],
    },
    {
        title: 'Ayuda',
        links: ['Preguntas frecuentes', 'Cuidados', 'Despachos', 'Cambios y devoluciones'],
    },
    {
        title: 'Señorita María Joyas',
        links: ['Nuestra historia', 'Materiales', 'Hecho a mano', 'Contacto'],
    },
    {
        title: 'Políticas',
        links: ['Términos y condiciones', 'Privacidad', 'Medios de pago'],
    },
]

const socials = [
        { label: 'Facebook', Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100064763182163' },
        { label: 'Instagram', Icon: Instagram, href: 'https://www.instagram.com/senoritamaria.cl' },

]

const Footer = () => {
    return (
        <footer className="w-full border-t border-dust-grey-200 bg-white text-dust-grey-700">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pt-12 pb-10">
                <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:grid-cols-5">
                    <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-dust-grey-700 text-white">
                                <span className="text-lg font-semibold">SM</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-dust-grey-900">Señorita María Joyas</p>
                                <p className="text-xs text-dust-grey-600">Accesorios hechos a mano</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-dust-grey-600">
                            Diseños hechos a mano con piedras naturales y mostacillas miyuki para acompañarte todos los días.
                        </p>
                        <div className="flex gap-4">
                            {socials.map(({ Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="rounded-full border border-dust-grey-200 p-2 text-dust-grey-500 transition hover:border-dust-grey-400 hover:text-dust-grey-800"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {sections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-dust-grey-500">
                                {section.title}
                            </h3>
                            <ul className="mt-4 space-y-2 text-sm text-dust-grey-700">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a className="transition hover:text-dust-grey-900" href="/en-construccion">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-dust-grey-200 pt-6 text-center text-xs text-dust-grey-500">
                    <p>© {new Date().getFullYear()} Señorita María Joyas. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer