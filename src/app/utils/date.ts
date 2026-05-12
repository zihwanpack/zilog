import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function formatDate(date: string): string {
  return format(new Date(date), "yyyy년 MM월 dd일", { locale: ko });
}
