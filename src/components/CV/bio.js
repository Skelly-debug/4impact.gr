import Image from 'next/image'


export default function Bio() {
  const contactInfo = [
    { icon: '📧', text: 'info@4impact.gr' },
    { icon: '📱', text: '+30 210 1234567' },
    { icon: '📍', text: 'Αθήνα, Αττική' },
  ];

  const workExperience = [
    {
      position: 'Previous Position',
      duration: 'Fall 2018 - Summer 2023',
      accomplishments: [
        "Makaronia",
        'me',
        'kima',
      ],
    },
    {
      position: 'Previous Position 2',
      duration: 'Summer 2015 - Winter 2017',
      accomplishments: [
        'Makaronia',
        'me tiri',
      ],
    },
  ];

  const skills = [
    'Communication',
    'Leadership',
    'Problem Solving',
    'Marketing',
    'Project Management',
  ];

  return (
    <div className="max-w-[85%] mx-auto p-8 bg-white shadow-lg rounded-lg relative">
      <div className="absolute top-8 right-8 md:right-12">
        <Image
          src="https://placehold.co/600x400"
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full border-4 border-gray-300"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-800">Ιάσωνας Κάντας</h2>
        <p className="text-xl text-gray-600">Communications Expert</p>
      </div>

      <div className="mb-6">
        {contactInfo.map((info, index) => (
          <p key={index} className="text-gray-700">
            {info.icon} {info.text}
          </p>
        ))}
      </div>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Professional Summary</h3>
        <p className="text-gray-700">
          Ta papakia sti seira
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Work Experience</h3>
        {workExperience.map((job, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-xl font-medium text-gray-800">{job.position}</h4>
            <p className="text-gray-600 italic">{job.duration}</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {job.accomplishments.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Education</h3>
        <div>
          <h4 className="text-xl font-medium text-gray-800">Master Communications</h4>
          <p className="text-gray-700">Αθηνα 2012</p>
        </div>
        <div>
          <h4 className="text-xl font-medium text-gray-800">Bachelor Communications</h4>
          <p className="text-gray-700">Αθηνα 2015</p>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

