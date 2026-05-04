'use client';

import { motion } from 'framer-motion';

export function AboutBio() {
  return (
    <section aria-labelledby="bio" className="container-prose py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-12 md:grid-cols-12 md:gap-16"
      >
        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            The long version
          </p>
          <h2 id="bio" className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[2.25rem]">
            From the giving moment to the giving system.
          </h2>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink/80">
            <p>
              Dale Nirvani Pfeifer co-founded Goodworld, the technology behind the #donate hashtag,
              which lets people give on Instagram, Facebook, and X with a single comment. Goodworld
              made giving frictionless. It also surfaced a harder question: did frictionless
              generosity actually improve outcomes for the communities donations were meant to
              serve?
            </p>
            <p>
              That question carried her into the CEO role at Giving Compass, a philanthropic
              intelligence platform that helps people give purposefully and with impact. Giving
              Compass elevates high-impact, often local nonprofits, breaks down complex issues,
              and surfaces signals of trust and accountability so donors can move money where it
              matters.
            </p>
            <p>
              Across both companies, the throughline is the same. The mechanics of giving are now
              easy. The judgment behind giving is harder than ever. AI accelerates both. Used
              poorly, it amplifies noise and erodes trust. Used deliberately, it creates space for
              the human work that fundraising has always rested on: connection, stewardship, and
              the patient construction of long-term relationships.
            </p>
            <p>
              <span className="italic">AI for Nonprofit Fundraising</span> is
              the book she wished existed when she first started talking to nonprofit leaders about
              AI. It is written for fundraisers who want practical answers, not hype, and who hold
              trust as seriously as targets.
            </p>
            <p>
              Dale writes and speaks on AI and philanthropy with leaders including Jeff Raikes,
              former CEO of the Bill &amp; Melinda Gates Foundation, with whom she co-authored the
              widely cited piece <span className="italic">Reducing AI Bias: A Path Forward</span>.
              Her work has been featured by Stanford Social Innovation Review, Alliance Magazine,
              and the Bridgespan Group.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
