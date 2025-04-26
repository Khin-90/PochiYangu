"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function RulesAcceptanceModal({
  rules,
  open,
  onClose,
  onAccept
}: {
  rules: any[],
  open: boolean,
  onClose: () => void,
  onAccept: (accepted: string[]) => void
}) {
  const [acceptedRules, setAcceptedRules] = useState<string[]>([])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chama Rules Acceptance</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {rules.map(rule => (
            <div key={rule.id} className="p-4 border rounded-lg">
              <p>{rule.rule}</p>
              {rule.requires_acknowledgement && (
                <div className="mt-2 flex items-center">
                  <Checkbox
                    id={`rule-${rule.id}`}
                    checked={acceptedRules.includes(rule.id)}
                    onCheckedChange={checked => 
                      setAcceptedRules(prev =>
                        checked ? [...prev, rule.id] : prev.filter(id => id !== rule.id)
                    }
                  />
                  <label htmlFor={`rule-${rule.id}`} className="ml-2 text-sm">
                    I acknowledge and agree to this rule
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              onAccept(acceptedRules)
              onClose()
            }}
            disabled={acceptedRules.length !== 
              rules.filter(r => r.requires_acknowledgement).length}
          >
            Accept and Join
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}