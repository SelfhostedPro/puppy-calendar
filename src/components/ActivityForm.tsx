import { useMemo, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { ActivityFormSchema, type ActivityForm } from '@/types'
import { PlusCircle } from 'lucide-react';
import { ActivityType } from '../types';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { getNearest15MinuteInterval, setTimeOnDate, roundToNearest15Minutes } from '@/lib/timeutils';

interface ActivityFormProps {
  doSubmit: (type: ActivityType, description: string, duration: number | null, time: Date) => void;
}

export default function ActivityForm({ doSubmit }: ActivityFormProps) {
  const currentDate = roundToNearest15Minutes(new Date());
  const initialTime = getNearest15MinuteInterval(currentDate);
  console.log(initialTime)
  const [duration, setDuration] = useState<number | undefined>(undefined);

  const [time, setTime] = useState<string>(initialTime);
  const [date, setDate] = useState<Date>(currentDate);

  // When selecting a date
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const updatedDate = setTimeOnDate(selectedDate, time);
      setDate(updatedDate);
      console.log(updatedDate);
      form.setValue('time', updatedDate); // Ensure form state is updated
    }
  };

  // When selecting a time
  const handleTimeChange = (selectedTime: string) => {
    setTime(selectedTime);
    const updatedDate = setTimeOnDate(date, selectedTime);
    setDate(updatedDate);
    console.log(updatedDate);
    form.setValue('time', updatedDate);
  };

  // 1. Define your form.
  const form = useForm<ActivityForm>({
    resolver: zodResolver(ActivityFormSchema),
    defaultValues: {
      type: 'meal',
      description: '',
      duration: null,
      time: currentDate,
    },
  })

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<ActivityForm> = (data: z.infer<typeof ActivityFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(data)
    doSubmit(data.type, data.description, data.duration, data.time);
    form.reset();
  }

  const showDurationField = useMemo(() => ['walk', 'training'].includes(form.getValues().type), [form.getValues().type]);
  return (
    <Form  {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col space-y-4">
          <div className='flex flex-row gap-2'>
            <FormField control={form.control} name="type" render={({ field }) => (
              <FormItem className={showDurationField ? 'basis-3/4' : 'w-full'}>
                <FormLabel>Activity Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="meal">Meal</SelectItem>
                    <SelectItem value="pee">Pee</SelectItem>
                    <SelectItem value="poop">Poop</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="walk">Walk</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
            />

            {showDurationField && (
              <FormField control={form.control} name="duration" render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select defaultValue={duration?.toString()}
                    onValueChange={(e) => {
                      const duration = parseInt(e);
                      setDuration(duration);
                      field.onChange(duration);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[15rem]">
                        {
                          Array.from({ length: 10 }).map((_, i) => {
                            const duration = i * 15;
                            return (
                              <SelectItem key={i} value={duration.toString()}>
                                {duration} min
                              </SelectItem>
                            );
                          })
                        }
                      </ScrollArea>

                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            )}
          </div>

          <div className='flex flex-row gap-2'>
            <FormField control={form.control} name="time" render={({ field }) => (
              <FormItem className="flex flex-col basis-3/4">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={handleDateSelect}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="time" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Time</FormLabel>
                <Select
                  defaultValue={getNearest15MinuteInterval(field.value)}
                  onValueChange={handleTimeChange}
                >
                  <FormControl>
                    <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <ScrollArea className="h-[15rem]">
                      {Array.from({ length: 96 }).map((_, i) => {
                        let hour = Math.floor(i / 4);
                        const minute = ((i % 4) * 15).toString().padStart(2, "0");
                        const ampm = hour >= 12 ? "PM" : "AM";
                        hour = hour % 12 || 12; // Convert to 12-hour format and handle midnight (0) as 12
                        return (
                          <SelectItem key={i} value={`${hour.toString().padStart(2, "0")}:${minute} ${ampm}`}>
                            {hour.toString().padStart(2, "0")}:{minute} {ampm}
                          </SelectItem>
                        );
                      })}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="If anything interesting happened ..."
                  {...field} />
              </FormControl>
            </FormItem>
          )} />

          <Button type="submit" className="inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Activity
          </Button>
        </div>
      </form>
    </Form >
  );
}
