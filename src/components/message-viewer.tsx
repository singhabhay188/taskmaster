export default function MessageViewer({ message }: { message: string }) {
     return (
          <div className="text-center py-12">
               <p className="text-muted-foreground">{ message }</p>
          </div>
     )
}