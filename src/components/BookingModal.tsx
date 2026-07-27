import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle2, ChevronRight, Clock, User, Sparkles } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const treatments = [
  { id: "consultation", name: "Initial Consultation", duration: "45 min", price: "Complimentary" },
  { id: "veneers", name: "Porcelain Veneers", duration: "90 min", price: "From $1,500" },
  { id: "implants", name: "Dental Implants", duration: "120 min", price: "From $3,000" },
  { id: "whitening", name: "Signature Whitening", duration: "60 min", price: "$450" },
  { id: "cleaning", name: "Aesthetic Cleaning", duration: "60 min", price: "$250" },
];

const dentists = [
  { 
    id: "dr-hayes", 
    name: "Dr. Julian Hayes", 
    specialty: "Lead Aesthetic Dentist",
    img: "https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3ODQ2NTcwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  { 
    id: "dr-chen", 
    name: "Dr. Elena Chen", 
    specialty: "Master Ceramist",
    img: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkzMTZ8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBsdXh1cnklMjBkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3ODQ3NTQ2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [selectedDentist, setSelectedDentist] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelectedTreatment(null);
      setSelectedDentist(null);
      setDate(undefined);
      setTime(null);
    }, 300);
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-background border-border/50 rounded-none shadow-elegant">
        
        {/* Header Area */}
        <div className="bg-foreground text-background p-8 relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <DialogHeader>
             <DialogTitle className="text-3xl font-serif font-light mb-2">Reserve Your Time</DialogTitle>
             <p className="text-background/60 font-light max-w-sm">
               {step === 1 && "Select your desired treatment."}
               {step === 2 && "Choose your preferred specialist."}
               {step === 3 && "Select a convenient date and time."}
               {step === 4 && "Confirm your reservation details."}
             </p>
           </DialogHeader>
           
           {/* Progress Indicator */}
           <div className="flex items-center gap-2 mt-8">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="flex items-center flex-1 gap-2">
                 <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= i ? 'bg-primary' : 'bg-background/20'}`}></div>
               </div>
             ))}
           </div>
        </div>

        {/* Content Area */}
        <div className="p-8 min-h-[400px]">
          
          {/* Step 1: Treatment */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              {treatments.map((t) => (
                <div 
                  key={t.id}
                  onClick={() => setSelectedTreatment(t.id)}
                  className={`p-4 border cursor-pointer transition-all duration-300 flex justify-between items-center group relative overflow-hidden ${selectedTreatment === t.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                >
                  <div className="relative z-10">
                    <h4 className="font-serif text-lg mb-1">{t.name}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Clock size={12} /> {t.duration}</span>
                      <span>{t.price}</span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selectedTreatment === t.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}>
                    {selectedTreatment === t.id && <CheckCircle2 size={14} />}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Dentist */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
              {dentists.map((d) => (
                <div 
                  key={d.id}
                  onClick={() => setSelectedDentist(d.id)}
                  className={`border cursor-pointer transition-all duration-300 text-center relative overflow-hidden group ${selectedDentist === d.id ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                >
                  <div className="aspect-[4/5] overflow-hidden mb-4 relative">
                    <img src={d.img} alt={d.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                    {selectedDentist === d.id && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-primary shadow-lg animate-in zoom-in duration-300">
                          <CheckCircle2 size={24} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 pt-0">
                    <h4 className="font-serif text-lg mb-1">{d.name}</h4>
                    <p className="text-xs text-primary uppercase tracking-widest">{d.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Select Date</h4>
                <div className="border border-border p-2 inline-block">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-none"
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  />
                </div>
              </div>
              
              <div className={`transition-opacity duration-300 ${!date ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Select Time</h4>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((t) => (
                    <div 
                      key={t}
                      onClick={() => setTime(t)}
                      className={`p-3 text-center text-sm border cursor-pointer transition-all ${time === t ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/50 text-foreground'}`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center justify-center text-center h-full py-8">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Sparkles size={28} />
              </div>
              <h3 className="text-3xl font-serif mb-4">Reservation Confirmed</h3>
              <p className="text-muted-foreground font-light mb-8 max-w-md">
                We look forward to welcoming you to Aura Dental. A confirmation email has been sent to you.
              </p>
              
              <div className="bg-secondary/30 border border-border/50 p-6 w-full max-w-sm text-left">
                <div className="flex items-center gap-3 mb-4 text-foreground">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span className="font-medium">{treatments.find(t => t.id === selectedTreatment)?.name}</span>
                </div>
                <div className="flex items-center gap-3 mb-4 text-foreground/80">
                  <User size={16} />
                  <span>{dentists.find(d => d.id === selectedDentist)?.name}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <CalendarIcon size={16} />
                  <span>{date && format(date, "MMMM d, yyyy")} at {time}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border bg-secondary/10 flex justify-between items-center">
          {step < 4 ? (
            <>
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className={`uppercase tracking-widest text-xs rounded-none ${step === 1 ? 'invisible' : ''}`}
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={
                  (step === 1 && !selectedTreatment) || 
                  (step === 2 && !selectedDentist) || 
                  (step === 3 && (!date || !time))
                }
                className="rounded-none bg-foreground text-background hover:bg-primary transition-colors uppercase tracking-widest text-xs h-12 px-8 group"
              >
                {step === 3 ? 'Confirm' : 'Next Step'}
                <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </>
          ) : (
            <Button 
              onClick={resetAndClose}
              className="w-full rounded-none bg-foreground text-background hover:bg-primary transition-colors uppercase tracking-widest text-xs h-12"
            >
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
