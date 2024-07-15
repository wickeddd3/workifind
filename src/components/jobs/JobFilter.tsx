import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";

export default function JobFilter() {
  return (
    <aside className="bg-gray-50 py-10 md:w-full px-3">
      <div className="max-w-4xl mx-auto">
        <form className="w-full">
          <div className="w-full space-y-4">
            <div className="w-full flex gap-2">
              <Input
                id="q"
                name="q"
                placeholder="Title, company, etc."
                className="w-full"
              />
              <Button>Search</Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select id="type" name="type" className="rounded-full md:w-[200px]">
                <option value="">Job types</option>
              </Select>
              <Select id="location" name="location" className="rounded-full md:w-[200px]">
                <option value="">Job locations</option>
              </Select>
              <Select id="location" name="location" className="rounded-full md:w-[200px]">
                <option value="">Work setup</option>
              </Select>
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
}
