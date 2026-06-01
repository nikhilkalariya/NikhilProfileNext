import type { Certification } from '@/types'
import { Award, ExternalLink, Calendar } from 'lucide-react'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

export default function CertificationsSection({
  certifications,
}: {
  certifications: Certification[]
}) {
  return (
    <section id="certifications" className="py-28 bg-[#f5f3ee]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-3">Verified credentials</p>
          <h2 className="section-title">Certifications</h2>
          <div className="divider" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className="relative overflow-hidden border border-[rgba(10,10,15,0.1)] bg-white/40 p-8 group hover:border-[#c8a96e] transition-all duration-300"
            >
              {/* Number watermark */}
              <span
                className="absolute -top-3 -right-2 font-display text-[6rem] leading-none font-semibold text-[rgba(200,169,110,0.06)] select-none pointer-events-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Icon + issuer */}
                  <div className="flex items-center gap-2 mb-4">
                    <Award size={14} className="text-[#c8a96e] shrink-0" />
                    <span
                      className="font-mono text-[#c8a96e] text-[10px] tracking-[0.2em] uppercase"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {cert.issuer}
                    </span>
                  </div>

                  <h3
                    className="font-display text-[#0a0a0f] text-xl font-normal mb-4 leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {cert.title}
                  </h3>

                  {/* Dates */}
                  <div className="flex flex-wrap items-center gap-4 text-xs mb-4">
                    <span className="flex items-center gap-1.5 text-[#8a8880]" style={{ fontFamily: 'var(--font-mono)' }}>
                      <Calendar size={11} />
                      Issued {formatDate(cert.issue_date)}
                    </span>
                    {cert.expiry_date && (
                      <span className="font-mono text-[#8a8880]" style={{ fontFamily: 'var(--font-mono)' }}>
                        Expires {formatDate(cert.expiry_date)}
                      </span>
                    )}
                  </div>

                  {/* Credential ID */}
                  {cert.credential_id && (
                    <p
                      className="font-mono text-[#8a8880] text-[10px] tracking-wide mb-4"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      ID: {cert.credential_id}
                    </p>
                  )}

                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[#c8a96e] text-xs tracking-wider uppercase hover:gap-2.5 transition-all duration-200"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      View Credential <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
