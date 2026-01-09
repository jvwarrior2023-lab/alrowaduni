
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    major: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    const targetDate = new Date(today.getTime() + (25 * 24 * 60 * 60 * 1000));

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        window.location.href = '/thank-you';
      } else {
        alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ scrollBehavior: 'smooth' }}>
      {/* Sticky Call & WhatsApp Buttons */}
      <div className="fixed left-6 bottom-6 z-50 flex flex-col gap-3" style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
        <a 
          href="tel:772035079"
          className="bg-[#046b43] hover:bg-[#8cc43c] text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center w-14 h-14"
          aria-label="Call us"
        >
          <i className="ri-phone-fill text-2xl"></i>
        </a>
        <a 
          href="https://wa.me/967772035079"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center w-14 h-14"
          aria-label="WhatsApp"
        >
          <i className="ri-whatsapp-fill text-2xl"></i>
        </a>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-[#046b43] via-[#046b43] to-[#8cc43c] min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-[#68d438]/20 rounded-full blur-3xl" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#ccdc44]/20 rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#8cc43c]/20 rounded-full blur-2xl" style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-[#68d438]/30 rounded-full blur-2xl" style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-[#ccdc44]/25 rounded-full blur-2xl" style={{ animation: 'float 9s ease-in-out infinite', animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="flex flex-col items-center text-center mb-8 md:mb-12">
            <div className="bg-white/95 backdrop-blur-sm p-4 md:p-6 rounded-3xl shadow-2xl mb-6 md:mb-8 transform hover:scale-105 transition-all duration-500" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.8s ease-out' }}>
              <img 
                src="https://static.readdy.ai/image/f01d069de9648afc1fc061d75fe35c05/0b2f6377224a48330e29568400ac7a1e.png" 
                alt="جامعة الرواد" 
                className="h-16 md:h-24"
              />
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl px-4 py-3 md:px-8 md:py-4 mb-4 md:mb-6 shadow-xl" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.9)', transition: 'all 0.6s ease-out 0.2s' }}>
              <p className="text-white text-sm md:text-lg font-bold mb-2">⏰ الوقت المتبقي للتسجيل</p>
              <div className="flex gap-2 md:gap-4 justify-center">
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-[#ccdc44]">{timeLeft.days}</div>
                  <div className="text-xs md:text-sm text-white/90">يوم</div>
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white">:</div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-[#ccdc44]">{timeLeft.hours}</div>
                  <div className="text-xs md:text-sm text-white/90">ساعة</div>
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white">:</div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-[#ccdc44]">{timeLeft.minutes}</div>
                  <div className="text-xs md:text-sm text-white/90">دقيقة</div>
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white">:</div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-[#ccdc44]">{timeLeft.seconds}</div>
                  <div className="text-xs md:text-sm text-white/90">ثانية</div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.3s' }}>
              انطلق نحو مستقبلك مع جامعة الرواد
            </h1>
            <p className="text-base md:text-xl lg:text-2xl mb-8 md:mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed px-4" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.5s' }}>
              بوابتك للتعليم الحديث بنظام الساعات المعتمدة. مرونة في الدراسة، جودة في التعليم، وتخصصات تواكب سوق العمل. سجل الآن في الترم الجديد.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.7s' }}>
              <button 
                onClick={() => scrollToSection('registration')}
                className="whitespace-nowrap cursor-pointer bg-[#68d438] hover:bg-[#8cc43c] text-[#046b43] font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl w-full sm:w-auto"
              >
                ابدأ التسجيل الإلكتروني الآن
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="whitespace-nowrap cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-full transition-all duration-300 border-2 border-white/30 w-full sm:w-auto"
              >
                اكتشف المزايا
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#046b43] mb-3 md:mb-4" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
              لماذا جامعة الرواد؟
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.2s' }}>
              نقدم لك تجربة تعليمية متميزة تجمع بين الجودة والمرونة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#046b43] to-[#8cc43c] p-6 md:p-8 rounded-3xl text-white transform hover:scale-105 hover:-rotate-1 transition-all duration-500 shadow-xl" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease-out 0.3s' }}>
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/20 rounded-2xl mb-4 md:mb-6 backdrop-blur-sm">
                <i className="ri-time-line text-3xl md:text-4xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">نظام الساعات المعتمدة</h3>
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                تحكم في مسارك الدراسي بمرونة عالية. يتيح لك نظام الساعات اختيار المواد التي تناسب جدولك واختصار سنوات الدراسة وفقاً لجهدك وتميزك.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#8cc43c] to-[#ccdc44] p-6 md:p-8 rounded-3xl text-white transform hover:scale-105 hover:-rotate-1 transition-all duration-500 shadow-xl" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease-out 0.5s' }}>
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/20 rounded-2xl mb-4 md:mb-6 backdrop-blur-sm">
                <i className="ri-building-line text-3xl md:text-4xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">بيئة تعليمية تكنولوجية</h3>
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                قاعات دراسية مجهزة ومعامل حديثة تدمج بين التعليم النظري والتطبيق العملي لضمان جاهزيتك لسوق العمل فور التخرج.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#ccdc44] to-[#68d438] p-6 md:p-8 rounded-3xl text-white transform hover:scale-105 hover:-rotate-1 transition-all duration-500 shadow-xl" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease-out 0.7s' }}>
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/20 rounded-2xl mb-4 md:mb-6 backdrop-blur-sm">
                <i className="ri-price-tag-3-line text-3xl md:text-4xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">أسعار تنافسية ودعم مستمر</h3>
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                نقدم تعليماً متميزاً برسوم دراسية تناسب الطالب اليمني، مع خيارات سداد ميسرة وخدمات طلابية متكاملة تدعمك طوال رحلتك الجامعية.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24 bg-gradient-to-br from-[#046b43]/5 to-[#8cc43c]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#046b43] mb-4 md:mb-6" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
              لا تفوت فرصة الالتحاق بهذا الفصل الدراسي
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.2s' }}>
              التسجيل يغلق قريباً. انضم لنخبة الطلاب في جامعة الرواد اليوم.
            </p>

            <div className="grid grid-cols-4 gap-3 md:gap-8 max-w-3xl mx-auto">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border-2 border-[#046b43]/10 transform hover:scale-110 transition-all duration-300" style={{ animation: 'bounce 2s ease-in-out infinite' }}>
                <div className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#046b43] mb-1 md:mb-2">
                  {timeLeft.days}
                </div>
                <div className="text-xs md:text-sm lg:text-lg text-gray-600 font-semibold">يوم</div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border-2 border-[#8cc43c]/10 transform hover:scale-110 transition-all duration-300" style={{ animation: 'bounce 2s ease-in-out infinite', animationDelay: '0.2s' }}>
                <div className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#8cc43c] mb-1 md:mb-2">
                  {timeLeft.hours}
                </div>
                <div className="text-xs md:text-sm lg:text-lg text-gray-600 font-semibold">ساعة</div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border-2 border-[#ccdc44]/10 transform hover:scale-110 transition-all duration-300" style={{ animation: 'bounce 2s ease-in-out infinite', animationDelay: '0.4s' }}>
                <div className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#ccdc44] mb-1 md:mb-2">
                  {timeLeft.minutes}
                </div>
                <div className="text-xs md:text-sm lg:text-lg text-gray-600 font-semibold">دقيقة</div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border-2 border-[#68d438]/10 transform hover:scale-110 transition-all duration-300" style={{ animation: 'bounce 2s ease-in-out infinite', animationDelay: '0.6s' }}>
                <div className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#68d438] mb-1 md:mb-2">
                  {timeLeft.seconds}
                </div>
                <div className="text-xs md:text-sm lg:text-lg text-gray-600 font-semibold">ثانية</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="registration" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#8cc43c] rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }}></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#68d438] rounded-full blur-3xl" style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <div className="text-center mb-12" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#046b43] mb-4">
              طلب الالتحاق المبدئي
            </h2>
            <p className="text-xl text-gray-600">
              املأ بياناتك وسيتواصل معك فريق القبول والتسجيل فوراً.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            data-readdy-form
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-[#8cc43c]"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease-out 0.3s' }}
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-lg font-bold text-[#046b43] mb-2">
                  الاسم الرباعي *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-[#8cc43c] focus:outline-none transition-all duration-300"
                  placeholder="أدخل اسمك الرباعي"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-lg font-bold text-[#046b43] mb-2">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-[#8cc43c] focus:outline-none transition-all duration-300"
                  placeholder="أدخل رقم هاتفك"
                  dir="ltr"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-lg font-bold text-[#046b43] mb-2">
                  رقم الواتساب *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-[#8cc43c] focus:outline-none transition-all duration-300"
                  placeholder="أدخل رقم الواتساب"
                  dir="ltr"
                />
              </div>

              <div>
                <label htmlFor="major" className="block text-lg font-bold text-[#046b43] mb-2">
                  التخصص الدراسي المرغوب *
                </label>
                <select
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-[#8cc43c] focus:outline-none transition-all duration-300 pr-8 cursor-pointer appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23046b43'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left 0.75rem center',
                    backgroundSize: '1.5rem'
                  }}
                >
                  <option value="">اختر التخصص</option>
                  <optgroup label="🟢 كلية العلوم الطبية 🟢">
                    <option value="طب وجراحة الفم والأسنان">طب وجراحة الفم والأسنان</option>
                    <option value="الصيدلة">الصيدلة</option>
                    <option value="علوم المختبرات الطبية">علوم المختبرات الطبية</option>
                    <option value="التمريض">التمريض</option>
                    <option value="التغذية العلاجية">التغذية العلاجية</option>
                  </optgroup>
                  <optgroup label="🟢 كلية العلوم والهندسة 🟢">
                    <option value="تقنية المعلومات">تقنية المعلومات</option>
                    <option value="الأمن السيبراني">الأمن السيبراني</option>
                    <option value="هندسة المعدات الطبية">هندسة المعدات الطبية</option>
                    <option value="التصميم الجرافيكي والملتميديا">التصميم الجرافيكي والملتميديا</option>
                  </optgroup>
                  <optgroup label="🟢 كلية المال والأعمال 🟢">
                    <option value="إدارة الأعمال الدولية">إدارة الأعمال الدولية</option>
                    <option value="المحاسبة">المحاسبة</option>
                    <option value="نظم المعلومات الإدارية">نظم المعلومات الإدارية</option>
                  </optgroup>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#046b43] to-[#8cc43c] text-white text-xl font-bold py-5 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب وحجز المقعد'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-[#046b43] text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <img 
                src="https://static.readdy.ai/image/f01d069de9648afc1fc061d75fe35c05/0b2f6377224a48330e29568400ac7a1e.png" 
                alt="جامعة الرواد" 
                className="h-12"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <i className="ri-map-pin-line text-2xl w-8 h-8 flex items-center justify-center"></i>
                <span className="text-lg">تعز - حبيل سلمان</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <i className="ri-phone-line text-2xl w-8 h-8 flex items-center justify-center"></i>
                <span className="text-lg" dir="ltr">772035079 | 04246048</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <i className="ri-mail-line text-2xl w-8 h-8 flex items-center justify-center"></i>
                <span className="text-lg">info@alrowad.edu.ye</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/alrowad.uni" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-full p-3 cursor-pointer transform hover:scale-110"
              >
                <i className="ri-facebook-fill text-2xl w-6 h-6 flex items-center justify-center"></i>
              </a>
              <a 
                href="https://www.instagram.com/alrowad.uni" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-full p-3 cursor-pointer transform hover:scale-110"
              >
                <i className="ri-instagram-line text-2xl w-6 h-6 flex items-center justify-center"></i>
              </a>
              <a 
                href="https://www.youtube.com/@alrowaduni" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-full p-3 cursor-pointer transform hover:scale-110"
              >
                <i className="ri-youtube-fill text-2xl w-6 h-6 flex items-center justify-center"></i>
              </a>
            </div>

            <div className="pt-8 border-t border-white/20 w-full">
              <p className="text-white/80">© 2026 جامعة الرواد. جميع الحقوق محفوظة</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
