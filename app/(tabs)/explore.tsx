import { BookCover } from "@/components/BookCover";
import { SectionHeader } from "@/components/SectionHeader";
import { images } from "@/constants/images";
import { CategoryIconName, ExploreBook, ExploreCategoryPill, exploreBookSections, exploreCategoryRows } from "@/data/explore";
import { Image } from "expo-image";
import { Href, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function SearchIcon() {
  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" fill="none">
      <Path
        d="M7.79167 12.75C10.5301 12.75 12.75 10.5301 12.75 7.79167C12.75 5.05325 10.5301 2.83333 7.79167 2.83333C5.05325 2.83333 2.83333 5.05325 2.83333 7.79167C2.83333 10.5301 5.05325 12.75 7.79167 12.75Z"
        stroke="#C8C7CC"
        strokeWidth={1.73542}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.1667 14.1667L11.7583 11.7583"
        stroke="#C8C7CC"
        strokeWidth={1.73542}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BusinessIcon({ width, height }: { width: number; height: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 17.9998" fill="none">
      <Path d="M9 13.4803V11.1157" stroke="white" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6958 2.90501C16.2496 2.90501 17.5 4.18188 17.5 5.757V8.96315C15.2382 10.3053 12.2501 11.1161 8.9954 11.1161C5.74067 11.1161 2.76176 10.3053 0.5 8.96315V5.74768C0.5 4.17256 1.7596 2.90501 3.31341 2.90501H14.6958Z"
        stroke="white"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.2196 2.90089V2.55977C12.2196 1.4227 11.3094 0.5 10.1877 0.5H7.81563C6.69395 0.5 5.78372 1.4227 5.78372 2.55977V2.90089"
        stroke="white"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M0.524349 12.3672L0.698119 14.7056C0.815804 16.2817 2.11126 17.4998 3.66967 17.4998H14.334C15.8924 17.4998 17.1878 16.2817 17.3055 14.7056L17.4793 12.3672"
        stroke="white"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function PsychologyIcon({ width, height }: { width: number; height: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 19.125 21" fill="none">
      <Path
        d="M10.9959 0.0187551C6.16741 -0.26011 2.10184 2.5908 2.19379 7.23582L2.19012 7.65623L0.0923528 11.133C-0.0204824 11.3203 -0.0305335 11.5471 0.0655644 11.7431C0.160876 11.9392 0.351149 12.08 0.576076 12.1212L1.8725 12.4571L2.27944 16.1442C2.29063 16.4992 2.45892 16.8333 2.74416 17.0675C3.02974 17.3002 3.40692 17.411 3.78297 17.3715L4.81841 17.4491C5.02022 17.4278 5.22282 17.4882 5.37393 17.6154C5.52549 17.743 5.61188 17.925 5.61188 18.1158V21H14.3703C14.3703 21 14.3703 19.6081 14.3703 19.0476C14.3703 18.4871 14.5763 17.2056 14.9679 16.6192C16.3877 14.4885 18.6992 13.3549 19.089 8.98456C19.4788 4.61488 16.7001 0.348644 10.9959 0.0187551ZM17.0333 8.1451C16.6037 8.1451 16.155 8.1451 16.155 8.1451C15.9413 8.14477 15.7678 7.98194 15.7674 7.78133V7.27355C15.7674 7.08763 15.6062 6.93632 15.4081 6.93632C15.2096 6.93632 15.0484 7.08763 15.0484 7.27355V7.78133C15.0487 8.35514 15.544 8.8196 16.155 8.81992C16.1561 8.81992 16.5214 8.81992 16.9086 8.81992C16.4957 10.4194 15.3582 11.0218 14.2177 10.4173C13.4745 10.0227 13.5378 9.43389 13.1912 8.94535V7.16101C13.1912 6.97508 13.0299 6.82378 12.8315 6.82378C12.6331 6.82378 12.4722 6.97513 12.4722 7.16101V8.41625C11.9561 8.20871 11.1344 8.07553 9.76232 8.07553C9.39073 8.07553 9.04781 8.07274 8.72796 8.06713V6.7116C8.72796 6.52498 8.56675 6.374 8.36831 6.374C8.16982 6.374 8.009 6.52498 8.009 6.7116V8.04863C5.10142 7.9424 4.67398 7.50382 4.44538 6.40095C4.43607 6.33524 4.42939 6.27027 4.4234 6.20559H5.9496C6.67342 6.20559 7.26023 5.65483 7.26023 4.97586V4.44467C7.26023 4.25842 7.09906 4.10744 6.90053 4.10744C6.70209 4.10744 6.54127 4.25842 6.54127 4.44467V4.97586C6.54052 5.28233 6.27618 5.53047 5.9496 5.53113H4.42152C4.5094 4.59249 4.98189 3.82509 5.71615 3.12335C6.27727 2.58621 6.96945 2.17002 7.75471 1.8873C7.75471 2.32346 7.75471 2.74908 7.75471 2.91999C7.75689 3.20936 7.86492 3.5043 8.07267 3.75515C8.1769 3.8796 8.30949 3.99214 8.47144 4.07389C8.63226 4.15633 8.82402 4.20596 9.02845 4.20563C9.60591 4.20563 10.1838 4.20563 10.1838 4.20563C10.3823 4.20563 10.5431 4.05432 10.5431 3.8684C10.5431 3.68215 10.3823 3.53084 10.1838 3.53084C10.1838 3.53084 9.60591 3.53084 9.02845 3.53084C8.94428 3.53047 8.8769 3.5123 8.81287 3.48014C8.71791 3.43261 8.62929 3.34492 8.56675 3.23725C8.50457 3.13102 8.47253 3.00658 8.47363 2.91995C8.47363 2.72111 8.47363 2.17737 8.47363 1.67341C9.06975 1.52874 9.70607 1.45221 10.3715 1.45221C10.5405 1.45221 10.7118 1.45709 10.8831 1.46722C12.391 1.55426 13.6964 1.99805 14.7189 2.76053V5.7271C14.7189 5.91372 14.8801 6.06499 15.0786 6.06499C15.277 6.06499 15.4378 5.91368 15.4378 5.7271V3.39701C15.4569 3.4169 15.4766 3.43613 15.4955 3.4564C16.5254 4.57501 17.0806 6.11856 17.0661 7.75578C17.059 7.89109 17.0475 8.01963 17.0333 8.1451Z"
        fill="white"
      />
      <Path
        d="M12.473 3.53467C12.2745 3.53467 12.1133 3.68597 12.1133 3.87223V4.96254C12.1129 5.19806 11.9097 5.39026 11.6579 5.39062H10.376C10.1775 5.39062 10.0167 5.54123 10.0167 5.72753C10.0167 5.91415 10.1775 6.06541 10.376 6.06541H11.6579C12.3069 6.06439 12.8323 5.57163 12.8323 4.96254V3.87223C12.8323 3.68597 12.6714 3.53467 12.473 3.53467Z"
        fill="white"
      />
    </Svg>
  );
}

function CareerIcon({ width, height }: { width: number; height: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 23 15" fill="none">
      <Path
        d="M23 1.86039V8.15191C23 8.15191 21.5091 8.41467 21.2011 8.45168C20.893 8.48869 19.9361 8.76625 19.2379 8.16301C18.1618 7.21558 14.3463 3.79225 14.3463 3.79225C14.1064 3.61654 13.8107 3.51427 13.502 3.50029C13.1933 3.48632 12.8876 3.56136 12.6295 3.71453C11.6602 4.17344 10.2186 4.85071 9.61893 5.11347C9.41673 5.21998 9.18784 5.27852 8.9537 5.2836C8.71955 5.28867 8.4878 5.24013 8.28015 5.14251C8.0725 5.04488 7.89574 4.90137 7.76642 4.72542C7.63709 4.54946 7.55943 4.34681 7.54071 4.13644C7.55387 3.89697 7.6418 3.66571 7.79439 3.46929C7.94697 3.27287 8.15801 3.11927 8.40321 3.02617C9.77089 2.28599 12.6582 0.805631 13.8616 0.243095C14.5927 -0.126995 15.1184 -0.126995 16.1246 0.613184C17.3609 1.57172 18.4821 2.41182 18.4821 2.41182C18.6149 2.49716 18.7667 2.55558 18.9269 2.58305C19.0871 2.61052 19.2521 2.6064 19.4104 2.57096C20.7945 2.31189 23 1.86039 23 1.86039ZM7.80357 12.4894C7.89656 12.2971 7.92721 12.085 7.89199 11.8777C7.85677 11.6704 7.75712 11.4764 7.60456 11.318C7.452 11.1596 7.25278 11.0434 7.02997 10.9828C6.80715 10.9223 6.56985 10.9198 6.34554 10.9757C6.41362 10.7861 6.42517 10.5837 6.37903 10.3889C6.33289 10.194 6.23069 10.0135 6.08268 9.86542C5.92156 9.72697 5.72329 9.6286 5.5073 9.57995C5.29132 9.53129 5.06501 9.53402 4.85054 9.58785C4.91808 9.39795 4.92897 9.19538 4.88211 9.00049C4.83524 8.8056 4.73228 8.62526 4.58357 8.47758C4.31739 8.25604 3.96563 8.13705 3.60342 8.14604C3.2412 8.15503 2.89724 8.29128 2.645 8.5257C2.07821 9.01421 1.71268 9.90243 2.23429 10.428C2.75589 10.9535 3.31857 10.6315 3.76214 10.539C3.63893 10.935 3.26929 11.3051 3.72518 11.8232C4.18107 12.3413 4.80946 12.0267 5.25304 11.9342C5.12982 12.3302 4.77661 12.7336 5.21196 13.2147C5.64732 13.6958 6.37839 13.4405 6.85482 13.3072C6.67 13.7329 6.27571 14.1918 6.78089 14.7099C7.28607 15.228 8.45661 14.9875 9.0275 14.4952C9.29835 14.2801 9.46343 13.9769 9.48653 13.6522C9.50963 13.3275 9.38886 13.0078 9.15071 12.7632C8.977 12.6087 8.75871 12.5011 8.5206 12.4527C8.28249 12.4043 8.03409 12.417 7.80357 12.4894ZM18.2152 9.22516L13.8082 5.27261C13.6044 5.10082 13.3499 4.98569 13.0752 4.94105C12.8005 4.89641 12.5174 4.92415 12.2598 5.02095C11.6437 5.26521 10.8511 5.59829 10.2514 5.84995C9.83865 6.07145 9.3778 6.2103 8.90018 6.25705C8.39914 6.26135 7.9103 6.11784 7.50823 5.84841C7.10616 5.57898 6.81295 5.19842 6.67334 4.7648C6.53372 4.33118 6.55536 3.86831 6.73496 3.44681C6.91455 3.02531 7.24225 2.66833 7.66804 2.43032C8.625 1.84188 10.7155 0.831537 10.7155 0.831537C10.4525 0.582315 10.1328 0.387174 9.77843 0.259435C9.42402 0.131696 9.0432 0.0743654 8.66196 0.0913582C7.25732 0.0913582 4.31661 1.83078 4.31661 1.83078C4.00547 1.97726 3.6613 2.05774 3.31038 2.06608C2.95946 2.07442 2.61106 2.01039 2.29179 1.87889L0 1.16092V8.34065C0 8.34065 0.653036 8.51089 1.23214 8.71074C1.36369 8.36519 1.58311 8.05214 1.87286 7.79662C2.34026 7.39252 2.96165 7.16504 3.60938 7.16091C4.25712 7.15678 4.88202 7.37631 5.35571 7.77441C5.61929 8.01963 5.80877 8.3216 5.90607 8.65153C6.26233 8.75145 6.5855 8.92948 6.84661 9.16965C7.11114 9.41944 7.29934 9.72673 7.39286 10.0616C7.7684 10.1666 8.10677 10.3586 8.37417 10.6184C8.64156 10.8781 8.8286 11.1966 8.91661 11.5419C9.28969 11.6376 9.62824 11.8202 9.89821 12.0712C10.1502 12.3086 10.3365 12.5962 10.4421 12.9106C10.5477 13.225 10.5696 13.5574 10.5061 13.8809C10.5061 13.8809 10.8346 14.214 11.0359 14.3953C11.2254 14.5661 11.4825 14.662 11.7505 14.662C12.0186 14.662 12.2756 14.5661 12.4652 14.3953C12.6547 14.2245 12.7612 13.9929 12.7612 13.7514C12.7612 13.5098 12.6547 13.2782 12.4652 13.1074C12.4652 13.1074 13.2866 14.0252 14.223 13.4775C15.0445 12.9594 14.9171 12.345 14.527 11.9971C14.6461 12.1249 14.7939 12.2285 14.9607 12.301C15.1274 12.3736 15.3094 12.4134 15.4945 12.418C15.6796 12.4225 15.8637 12.3917 16.0346 12.3274C16.2056 12.2632 16.3594 12.167 16.4861 12.0452C16.6624 11.8843 16.7656 11.6699 16.7755 11.4439C16.7853 11.218 16.7012 10.9969 16.5395 10.824C16.5395 10.824 17.0857 11.4938 18.1823 10.8684C18.9586 10.2762 18.593 9.59895 18.1823 9.24367L18.2152 9.22516Z"
        fill="white"
      />
    </Svg>
  );
}

function HappinessIcon({ width, height }: { width: number; height: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 19" fill="none">
      <Path
        d="M9.5 0C4.26171 0 0 4.26171 0 9.5C0 14.7383 4.26171 19 9.5 19C14.7383 19 19 14.7383 19 9.5C19 4.26171 14.7384 0 9.5 0ZM9.5 17.973C7.17266 17.973 5.06171 17.0296 3.52885 15.5055C2.91673 14.8968 2.39711 14.1954 1.99252 13.4245C1.37636 12.2505 1.02704 10.9153 1.02704 9.5C1.02704 4.82799 4.82799 1.02704 9.5 1.02704C11.716 1.02704 13.7357 1.88257 15.2471 3.28024C16.0308 4.00482 16.6779 4.87498 17.1445 5.84759C17.6753 6.95416 17.973 8.19296 17.973 9.5C17.973 14.172 14.172 17.973 9.5 17.973Z"
        fill="white"
      />
      <Path
        d="M6.25275 7.34334C6.80479 7.34334 7.25393 7.7668 7.25393 8.34451H8.28097C8.28097 7.18909 7.37114 6.3163 6.25275 6.3163C5.13437 6.3163 4.22454 7.18909 4.22454 8.34451H5.25158C5.25158 7.7668 5.70078 7.34334 6.25275 7.34334Z"
        fill="white"
      />
      <Path
        d="M12.7471 7.34334C13.2992 7.34334 13.7483 7.7668 13.7483 8.34451H14.7753C14.7753 7.18909 13.8655 6.3163 12.7471 6.3163C11.6287 6.3163 10.7189 7.18909 10.7189 8.34451H11.7459C11.7459 7.7668 12.1951 7.34334 12.7471 7.34334Z"
        fill="white"
      />
      <Path
        d="M9.48183 14.7634C11.4688 14.7634 13.373 13.7473 14.4632 12.0602L13.6006 11.5027C12.5995 13.052 10.7676 13.9166 8.93442 13.705C7.50542 13.5402 6.18394 12.7169 5.39935 11.5027L4.53676 12.0602C5.48613 13.5294 7.08613 14.5256 8.8167 14.7252C9.03886 14.7509 9.2607 14.7634 9.48183 14.7634Z"
        fill="white"
      />
    </Svg>
  );
}

function SelfGrowthIcon({ width, height }: { width: number; height: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 19.0008 21.0001" fill="none">
      <Path
        d="M10.7832 3.06492C11.6378 3.06492 12.3308 2.37888 12.3308 1.53246C12.3308 0.686089 11.6378 0 10.7832 0C9.92896 0 9.23625 0.686089 9.23625 1.53246C9.23625 2.37888 9.92896 3.06492 10.7832 3.06492Z"
        fill="white"
      />
      <Path
        d="M14.3131 17.2265H10.5965V14.5462H6.8814V11.8654H3.16514V9.18449H0V10.2772H2.06218V12.958H5.77848V15.6389H9.49358V18.3191H13.2101V21H17.9587V19.9076L14.3131 19.9073V17.2265Z"
        fill="white"
      />
      <Path
        d="M18.6919 7.43399C18.6656 7.26005 18.5019 7.14 18.326 7.16608L17.5834 7.27666L17.5199 6.85851C17.4935 6.68839 17.3338 6.57191 17.1623 6.59709L17.0845 6.60865C17.0737 6.53754 17.0489 6.46728 17.0079 6.40268L15.9355 4.70423C15.8197 4.5211 15.6435 4.38358 15.4364 4.31513L13.4948 3.41835C12.7994 3.09737 11.9867 3.14806 11.3371 3.55288L8.35248 5.41464L6.60564 4.6026C6.33428 4.45208 5.99195 4.54124 5.8307 4.80443L5.80858 4.83999C5.72899 4.9707 5.70444 5.12685 5.74154 5.27474C5.77835 5.42264 5.8738 5.54979 6.00607 5.62804L8.088 6.85851C8.34685 7.0117 8.66252 7.03931 8.94465 6.93378L10.1777 6.27586L10.7624 8.61176L8.81901 8.602C8.49166 8.60109 8.1808 8.74485 7.97193 8.99467C7.7631 9.24453 7.67841 9.57375 7.74061 9.89235L8.39439 13.2261C8.46682 13.5953 8.82017 13.8425 9.19572 13.7867L9.22383 13.7826C9.59574 13.7275 9.8594 13.3947 9.82494 13.024L9.60352 10.6353L12.5361 10.7029C12.9571 10.7124 13.3599 10.5325 13.6313 10.2133C13.9027 9.89444 14.0131 9.47064 13.932 9.06107L13.8569 8.68349L13.2537 5.31215L14.8081 5.53945L15.9451 6.84551C15.8781 6.9131 15.8388 7.00551 15.8539 7.10632L15.9174 7.52508L15.175 7.63561C14.999 7.6617 14.8781 7.82412 14.9048 7.99835L15.2097 10.0076C15.2363 10.1816 15.4 10.3016 15.5756 10.2755L18.727 9.80614C18.9026 9.78005 19.0236 9.61763 18.9972 9.44336L18.6919 7.43399ZM16.1561 7.08135C16.3353 7.25385 16.6107 7.28642 16.8251 7.15189L16.8377 7.14385C16.9282 7.08725 16.9951 7.00785 17.0375 6.91893L17.2075 6.89342L17.2207 6.90289L17.2843 7.3214L16.2166 7.48021L16.1561 7.08135Z"
        fill="white"
      />
      <Path
        d="M15.2017 15.7842C15.462 16.0536 15.892 16.0699 16.1724 15.8207L16.1924 15.8032C16.4719 15.5549 16.5024 15.1313 16.2618 14.8454L14.6592 12.7154L14.211 10.4596C14.1763 10.5091 14.1407 10.558 14.1012 10.6045C13.72 11.0529 13.1614 11.3101 12.5692 11.3101L12.2969 11.3038L12.8316 13.0177C12.9698 13.301 13.1496 13.563 13.3648 13.7956L15.2017 15.7842Z"
        fill="white"
      />
    </Svg>
  );
}

const categoryIcons: Record<CategoryIconName, (props: { width: number; height: number }) => React.JSX.Element> = {
  business: BusinessIcon,
  psychology: PsychologyIcon,
  career: CareerIcon,
  happiness: HappinessIcon,
  "self-growth": SelfGrowthIcon,
};

/**
 * Figma "Chip" pills (nodes 6626:9255-9305) specify a #282828→#212121
 * gradient, but every react-native-svg attempt at it rendered as a flat
 * grey wash instead — a percentage-sized `<Svg>`/`<Rect>` absolutely
 * positioned inside a content-sized `TouchableOpacity` appears to be
 * unreliable on-device. Using a flat color (the gradient's midpoint) avoids
 * that failure mode entirely.
 */
function CategoryPill({ pill, onPress }: { pill: ExploreCategoryPill; onPress: () => void }) {
  const Icon = categoryIcons[pill.icon];
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center gap-[9px] rounded-[15px] border-[0.2px] border-[#4d4d4d] bg-[#242424]"
      style={{ height: 43, paddingTop: 8, paddingBottom: 10, paddingLeft: 9, paddingRight: 13 }}
    >
      <Text className="font-li-ador-light text-[18px] leading-[32px] text-white">{pill.label}</Text>
      <Icon width={pill.iconWidth} height={pill.iconHeight} />
    </TouchableOpacity>
  );
}

function BookWithAuthor({ book, onPress }: { book: ExploreBook; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ width: 80 }} onPress={onPress}>
      <BookCover source={book.cover} width={80} height={120} radius={6} />
      <Text numberOfLines={2} className="mt-2 font-aeonik-medium text-[9px] leading-[13px] text-[#aeaeae]">
        {book.author}
      </Text>
    </TouchableOpacity>
  );
}

/** Figma "Explore page" (node 6581:44710). */
export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    // No bottom inset — the shared tab bar (app/(tabs)/_layout.tsx) handles
    // the home-indicator safe area below this screen's content.
    <SafeAreaView edges={[]} style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View>
          {/* Top-left corner glow. Previously positioned with a negative
              `top` to bleed up behind the status bar (matching the home
              screen's technique) — but that puts the whole box outside this
              View's normal bounds, and Android's ScrollView clips
              absolutely-positioned children that extend above their
              container by default (iOS generally doesn't), which likely
              made it invisible on Android. Anchored at (0, 0) instead so it
              stays fully inside normal layout bounds on every platform.
              Box height matches glow-bg.png's own aspect ratio (650x432) so
              the image renders uncropped — its gradient only finishes
              fading to black near its natural bottom edge, so cropping it
              (the previous 350x160 box) cut it off mid-fade and left a
              hard seam against the solid background. */}
          <View pointerEvents="none" style={{ position: "absolute", left: 0, top: 0, width: 350, height: 233 }}>
            <Image source={images.exploreGlow} style={{ width: "100%", height: "100%" }} contentFit="contain" />
          </View>

          <View className="px-4" style={{ paddingTop: insets.top + 16 }}>
            <Text className="font-aeonik-bold text-[30px] leading-[39px] tracking-[-0.5px] text-white">
              Discover
            </Text>
            <View className="mt-2 h-1 w-[46px] rounded-full bg-primary" />
          </View>

          <View className="mt-5 px-[17px] pb-2">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/search")}
              className="h-[46px] flex-row items-center gap-[10px] rounded-[14px] border border-[#333] bg-[#131313] px-[14px]"
            >
              <SearchIcon />
              <Text className="flex-1 font-aeonik-regular text-[13px] text-[#c8c7cc]">
                Search by book title or author…
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="mt-[29px] pl-4 font-li-ador-semibold text-[17px] leading-[22px] text-white">
          ক্যাটাগরি
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          className="mt-5"
        >
          <View className="gap-[13px]">
            {exploreCategoryRows.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row gap-[10px]">
                {row.map((pill) => (
                  <CategoryPill
                    key={pill.id}
                    pill={pill}
                    onPress={() => router.push({ pathname: "/category", params: { id: pill.id } } as Href)}
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        {exploreBookSections.map((section, index) => (
          <View key={section.id}>
            <SectionHeader
              title={section.title}
              className={index === 0 ? "mt-[27px]" : "mt-[23px]"}
              // Cast needed — "/category" isn't in expo-router's generated
              // route types yet (.expo/types/router.d.ts regenerates on the
              // next `expo start`/build); it's a real, existing route.
              onSeeAll={() => router.push({ pathname: "/category", params: { id: "business" } } as Href)}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 15, paddingHorizontal: 16, paddingTop: 16 }}
            >
              {section.books.map((book, bookIndex) => (
                <BookWithAuthor
                  key={`${section.id}-${book.id}-${bookIndex}`}
                  book={book}
                  onPress={() => router.push({ pathname: "/book", params: { id: book.id } } as Href)}
                />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
