'use client';

import Link from 'next/link';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#046b43] via-[#046b43] to-[#8cc43c] flex items-center justify-center px-4" dir="rtl">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#68d438]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#ccdc44]/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#8cc43c]/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 text-center">
          <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-[#046b43] to-[#8cc43c] rounded-full mx-auto mb-8">
            <i className="ri-checkbox-circle-line text-5xl text-white"></i>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#046b43] mb-6">
            شكراً لاختيارك جامعة الرواد!
          </h1>

          <div className="bg-gradient-to-r from-[#046b43]/5 to-[#8cc43c]/5 rounded-2xl p-8 mb-8">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-4">
              تم استلام بياناتك بنجاح
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              سيقوم أحد موظفي خدمة العملاء بالتواصل معك عبر الواتساب أو الهاتف في أقرب وقت لتأكيد العرض واستكمال إجراءات التسجيل.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <div className="w-10 h-10 flex items-center justify-center bg-[#046b43]/10 rounded-lg">
                <i className="ri-time-line text-xl text-[#046b43]"></i>
              </div>
              <span className="text-lg">سنتواصل معك خلال 24 ساعة</span>
            </div>

            <div className="flex items-center justify-center gap-3 text-gray-600">
              <div className="w-10 h-10 flex items-center justify-center bg-[#8cc43c]/10 rounded-lg">
                <i className="ri-whatsapp-line text-xl text-[#8cc43c]"></i>
              </div>
              <span className="text-lg">تحقق من رسائل الواتساب والهاتف</span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/"
              className="whitespace-nowrap cursor-pointer inline-block bg-gradient-to-r from-[#046b43] to-[#8cc43c] hover:from-[#8cc43c] hover:to-[#046b43] text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              العودة للرئيسية
            </Link>
          </div>

          <div className="mt-8">
            <img 
              src="https://static.readdy.ai/image/f01d069de9648afc1fc061d75fe35c05/0b2f6377224a48330e29568400ac7a1e.png" 
              alt="جامعة الرواد" 
              className="h-16 mx-auto opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}