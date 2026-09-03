import { Link } from "react-router"
import { motion } from "motion/react"
import { ArrowUpRightIcon } from "lucide-react"

import { Container } from "@/components/foundation/Container"

const links = [
  ["Home", "/"],
  ["Work", "/work"],
  ["About", "/about"],
  ["Reading", "/reading"],
  ["Lab", "/lab"],
] as const

export function SiteFooter() {
  return (
    <footer
      className="
        overflow-hidden
        bg-night
        text-night-text
      "
    >
      <Container visual>
        <div className="py-20 medium:py-28">
          {/* Main footer composition */}

          <div
            className="
              grid gap-16
              wide:grid-cols-12
              wide:gap-10
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="wide:col-span-8"
            >
              <p className="text-meta text-night-text/40">
                /CONTACT
              </p>

              <h2
                className="
                  mt-5
                  max-w-[8ch]

                  text-[clamp(4rem,8vw,8.5rem)]
                  font-medium

                  leading-[0.84]
                  tracking-[-0.075em]
                "
              >
                Let&apos;s build{" "}
                <span className="font-serif font-normal italic">
                  something
                </span>{" "}
                useful.
              </h2>

              <motion.a
                href="mailto:aymen.jedidi@ensi-uma.tn"

                whileHover={{
                  x: 8,
                }}

                transition={{
                  duration: 0.2,
                }}

                className="
                  mt-10
                  inline-flex
                  items-center
                  gap-3

                  border-b border-lime
                  pb-2

                  text-lg
                "
              >
                aymen.jedidi@ensi-uma.tn

                <ArrowUpRightIcon className="size-4" />
              </motion.a>
            </motion.div>

            <div
              className="
                grid gap-12
                medium:grid-cols-2
                wide:col-span-4
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                }}
              >
                <p className="text-meta text-night-text/35">
                  /QUICK LINKS
                </p>

                <div className="mt-5 flex flex-col">
                  {links.map(([label, href], index) => (
                    <motion.div
                      key={href}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: 0.2 + index * 0.05,
                      }}
                    >
                      <Link
                        to={href}
                        className="
                          group
                          flex
                          items-center
                          justify-between

                          border-b border-white/10

                          py-3

                          transition-colors

                          hover:text-lime
                        "
                      >
                        {label}

                        <span
                          className="
                            opacity-0
                            transition-all
                            group-hover:translate-x-1
                            group-hover:opacity-100
                          "
                        >
                          ↗
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                }}
              >
                <p className="text-meta text-night-text/35">
                  /ELSEWHERE
                </p>

                <div className="mt-5 flex flex-col">
                  <a
                    href="https://github.com/JedidiAymen"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      border-b border-white/10
                      py-3
                      transition-colors
                      hover:text-lime
                    "
                  >
                    GitHub ↗
                  </a>

                  <Link
                    to="/resume"
                    className="
                      border-b border-white/10
                      py-3
                      transition-colors
                      hover:text-lime
                    "
                  >
                    Résumé ↗
                  </Link>

                  <a
                    href="mailto:aymen.jedidi@ensi-uma.tn"
                    className="
                      border-b border-white/10
                      py-3
                      transition-colors
                      hover:text-lime
                    "
                  >
                    Email ↗
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Giant identity line */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              mt-28
              border-t border-white/10
              pt-6
            "
          >
            <div
              className="
                flex flex-col gap-4
                text-sm text-night-text/40

                medium:flex-row
                medium:items-center
                medium:justify-between
              "
            >
              <span>©2026 Aymen Jedidi</span>

              <span>
                Tunis, Tunisia · Open to relocation
              </span>

              <span>
                Systems in Motion
              </span>
            </div>

            <div
              className="
                mt-9

                whitespace-nowrap

                text-[clamp(4rem,11vw,11rem)]
                font-medium

                leading-[0.75]
                tracking-[-0.08em]

                text-night-text
              "
            >
              AYMEN JEDIDI
            </div>
          </motion.div>
        </div>
      </Container>
    </footer>
  )
}
