'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="contact" ref={ref} className="bg-[#faf7f0] px-5 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
            문의하기
          </p>
          <h2 className="text-[clamp(32px,4vw,56px)] font-medium leading-[1.02] text-[#111110]">
            촬영을 함께 준비해볼까요.
          </h2>
          <p className="mt-7 max-w-md text-[15px] leading-8 text-[#5d574f]">
            필요한 이미지의 목적과 사용처를 알려주세요. 프로필, 브랜드, 개인 기록에 맞춰
            촬영 방향과 준비 과정을 정중하게 안내드리겠습니다.
          </p>

          <div className="mt-12 space-y-5 border-t border-[#1a1a18]/10 pt-7">
            {[
              ['Instagram', '@pinostudio_official'],
              ['이메일', 'hello@pinostudio.kr'],
              ['위치', '서울'],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[110px_1fr] gap-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a6f48]">
                  {label}
                </span>
                <span className="text-sm text-[#4b4740]">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
          className="border border-[#1a1a18]/10 bg-[#fffaf3] p-5 md:p-7"
          onSubmit={(event) => {
            event.preventDefault()
            alert('문의가 접수되었습니다. 확인 후 차분히 안내드리겠습니다.')
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="이름" name="name" placeholder="성함을 입력해 주세요" required />
            <Field label="연락처" name="phone" placeholder="010-0000-0000" />
          </div>
          <Field label="이메일" name="email" type="email" placeholder="이메일 주소" />
          <div className="mt-4">
            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a6f48]">
              문의 내용
            </label>
            <textarea
              rows={5}
              placeholder="촬영 목적, 희망 일정, 필요하신 분위기를 간단히 남겨주세요"
              className="w-full border border-[#1a1a18]/10 bg-[#faf7f0] px-4 py-3 text-sm text-[#111110] outline-none transition placeholder:text-[#8f887d] focus:border-[#111110]/42"
            />
          </div>
          <button
            type="submit"
            className="mt-5 h-12 w-full bg-[#111110] text-[11px] font-medium uppercase tracking-[0.24em] text-white transition hover:bg-[#2a2824]"
          >
            문의 보내기
          </button>
        </motion.form>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  placeholder: string
  type?: string
  required?: boolean
}) {
  return (
    <div className="mt-4 first:mt-0">
      <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a6f48]">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 w-full border border-[#1a1a18]/10 bg-[#faf7f0] px-4 text-sm text-[#111110] outline-none transition placeholder:text-[#8f887d] focus:border-[#111110]/42"
      />
    </div>
  )
}
