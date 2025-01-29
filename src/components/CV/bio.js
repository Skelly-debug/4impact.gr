import Image from "next/image";

export default function Bio() {
  return (
    <div className="max-w-[85%] mx-auto p-8 bg-white shadow-lg rounded-lg relative">
      <div className="absolute top-[6rem] left-20 lg:left-20 transform -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 flex items-center justify-center">
        <Image
          src="/images/profile.webp"
          alt="Profile Picture"
          width={160}
          height={160}
          className="rounded-full border-2 border-gray-300 object-cover"
        />
        <div className="ml-4 lg:ml-6">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
            Ιάσονας Κάντας
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Communication Strategist – 4Impact Communications Founder
          </p>
        </div>
      </div>

      <div className="mt-[10rem]">
        <p className="text-gray-700 leading-relaxed text-md md:text-lg lg:text-xl">
          Ο Ιάσονας Κάντας είναι ένας δυναμικός επαγγελματίας στον τομέα της
          επικοινωνίας και του marketing, με σημαντική εμπειρία στη στρατηγική
          επικοινωνία, την ενδυνάμωση της εταιρικής εικόνας και την ουσιαστική
          σύνδεση με τα κοινά, με βασικό του πάντα γνώμονα το ουσιαστικό impact.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed text-md md:text-lg lg:text-xl">
          Ως πρώην Head of Communication and Engagement Dpt στο{" "}
          <strong className="font-bold">WWF Ελλάς</strong>, σχεδίασε και
          υλοποίησε, με την ομάδα του, σειρά δράσεων ευαισθητοποίησης και
          συμμετοχής, ενισχύοντας την αναγνωρισιμότητα του οργανισμού και
          αυξάνοντας την αλληλεπίδραση με το κοινό σε κρίσιμα περιβαλλοντικά
          ζητήματα.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed text-md md:text-lg lg:text-xl">
          Παράλληλα είχε την ευκαιρία να συνεργαστεί με άλλους οργανισμούς σε
          εθνικό και διεθνές επίπεδο, καθώς και να συν-σχεδιάσει προγράμματα με
          μεγάλες εταιρείες όπως η{" "}
          <strong className="font-bold">Vodafone</strong> και η{" "}
          <strong className="font-bold">ΑΒ Βασιλόπουλος</strong>.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed text-md md:text-lg lg:text-xl">
          Επιπλέον, έχει αναπτύξει στρατηγικές επικοινωνίας για ευρωπαϊκά
          προγράμματα, όπως το LIFE, και διαθέτει εκτενή εμπειρία στη
          δημοσιογραφία σε όλες τις μορφές της και στη διαχείριση γραφείων
          τύπου, με εις βάθος γνώση του «μιντιακού τοπίου» και ένα διαρκώς
          αναπτυσσόμενο δίκτυο επαφών από τον δημοσιογραφικό χώρο. Μεγάλη του
          αγάπη παραμένει το visual storytelling και η παραγωγή πρωτότυπου
          περιεχομένου.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed text-md md:text-lg lg:text-xl">
          Τα τελευταία τρία χρόνια, έχει τη χαρά να είναι μέντορας σε πεδία
          branding, επικοινωνίας και στρατηγικής μέσω του “Social Dynamo” του{" "}
          <strong className="font-bold">Ιδρύματος Μποδοσάκη</strong>,
          υποστηρίζοντας μικρές και ανερχόμενες οργανώσεις της κοινωνίας των
          πολιτών.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed text-md md:text-lg lg:text-xl">
          Έχει επίσης συνεργαστεί με{" "}
          <strong className="font-bold">
            το Ίδρυμα Καπετάν Βασίλη και Κάρμεν Κωνσταντακόπουλου{" "}
          </strong>
          για τον σχεδιασμό στρατηγικής επικοινωνίας, ενώ παρέχει υπηρεσίες
          συμβουλευτικής και διαχείρισης σχέσεων ΜΜΕ στα{" "}
          <strong className="font-bold">Παιδικά Χωριά SOS</strong>.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed text-md md:text-lg lg:text-xl">
          Με πάθος για την επικοινωνία που φέρνει πραγματική αλλαγή, πίστη στη
          δύναμη των αυθεντικών ιστοριών και της συνδιαμόρφωσης και εξειδίκευση
          στις στρατηγικές επικοινωνίας, επιμένει να σχεδιάζει και να υλοποιεί
          δράσεις που εμπνέουν, κινητοποιούν και φέρνουν πραγματικό Impact.
        </p>
      </div>
    </div>
  );
}
